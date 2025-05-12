import { useState, useEffect } from 'react';
import { openDB, IDBPDatabase } from 'idb';
import { syncData } from '@/lib/supabase';

// Define the database structure
interface FiaGlobalDB {
  transactions: any[];
  audits: any[];
  complaints: any[];
  pendingSync: {
    table: string;
    data: any;
    action: 'create' | 'update' | 'delete';
    id: string;
    timestamp: number;
  }[];
}

const DB_NAME = 'fia_global_db';
const DB_VERSION = 1;

// Initialize the IndexedDB
async function initDB(): Promise<IDBPDatabase<FiaGlobalDB>> {
  return openDB<FiaGlobalDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create object stores
      if (!db.objectStoreNames.contains('transactions')) {
        db.createObjectStore('transactions', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('audits')) {
        db.createObjectStore('audits', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('complaints')) {
        db.createObjectStore('complaints', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('pendingSync')) {
        db.createObjectStore('pendingSync', { keyPath: 'id' });
      }
    },
  });
}

export function useOfflineSync() {
  const [db, setDb] = useState<IDBPDatabase<FiaGlobalDB> | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<Error | null>(null);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);

  // Initialize the DB
  useEffect(() => {
    const setupDB = async () => {
      try {
        const database = await initDB();
        setDb(database);
        
        // Get initial pending sync count
        const count = await database.count('pendingSync');
        setPendingSyncCount(count);
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };
    
    setupDB();
  }, []);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync when coming back online
  useEffect(() => {
    if (isOnline && db && pendingSyncCount > 0) {
      performSync();
    }
  }, [isOnline, db, pendingSyncCount]);

  // Add item to a store and mark for sync
  const addItem = async <T extends { id: string }>(
    storeName: keyof FiaGlobalDB,
    item: T
  ) => {
    if (!db) return null;
    
    try {
      // Save to local DB
      await db.put(storeName, item);
      
      // Add to pending sync if offline
      if (!isOnline) {
        await db.add('pendingSync', {
          table: storeName,
          data: item,
          action: 'create',
          id: `${storeName}_${item.id}_${Date.now()}`,
          timestamp: Date.now(),
        });
        
        const count = await db.count('pendingSync');
        setPendingSyncCount(count);
      } else {
        // If online, sync immediately
        await syncData(storeName, [item]);
      }
      
      return item;
    } catch (error) {
      console.error(`Failed to add item to ${storeName}:`, error);
      throw error;
    }
  };

  // Get items from a store
  const getItems = async <T>(storeName: keyof FiaGlobalDB): Promise<T[]> => {
    if (!db) return [];
    
    try {
      return db.getAll(storeName);
    } catch (error) {
      console.error(`Failed to get items from ${storeName}:`, error);
      return [];
    }
  };

  // Get a single item by ID
  const getItemById = async <T>(
    storeName: keyof FiaGlobalDB,
    id: string
  ): Promise<T | null> => {
    if (!db) return null;
    
    try {
      return db.get(storeName, id);
    } catch (error) {
      console.error(`Failed to get item ${id} from ${storeName}:`, error);
      return null;
    }
  };

  // Update an item
  const updateItem = async <T extends { id: string }>(
    storeName: keyof FiaGlobalDB,
    item: T
  ) => {
    if (!db) return null;
    
    try {
      // Update in local DB
      await db.put(storeName, item);
      
      // Add to pending sync if offline
      if (!isOnline) {
        await db.add('pendingSync', {
          table: storeName,
          data: item,
          action: 'update',
          id: `${storeName}_${item.id}_${Date.now()}`,
          timestamp: Date.now(),
        });
        
        const count = await db.count('pendingSync');
        setPendingSyncCount(count);
      } else {
        // If online, sync immediately
        await syncData(storeName, [item]);
      }
      
      return item;
    } catch (error) {
      console.error(`Failed to update item in ${storeName}:`, error);
      throw error;
    }
  };

  // Delete an item
  const deleteItem = async (
    storeName: keyof FiaGlobalDB,
    id: string
  ) => {
    if (!db) return false;
    
    try {
      // Delete from local DB
      await db.delete(storeName, id);
      
      // Add to pending sync if offline
      if (!isOnline) {
        await db.add('pendingSync', {
          table: storeName,
          data: { id },
          action: 'delete',
          id: `${storeName}_${id}_${Date.now()}`,
          timestamp: Date.now(),
        });
        
        const count = await db.count('pendingSync');
        setPendingSyncCount(count);
      }
      
      return true;
    } catch (error) {
      console.error(`Failed to delete item ${id} from ${storeName}:`, error);
      throw error;
    }
  };

  // Perform sync with server
  const performSync = async () => {
    if (!db || !isOnline) return;
    
    setIsSyncing(true);
    setSyncError(null);
    
    try {
      const pendingSyncs = await db.getAll('pendingSync');
      
      // Group by table for batch processing
      const groupedSyncs = pendingSyncs.reduce((acc, item) => {
        if (!acc[item.table]) {
          acc[item.table] = [];
        }
        
        // Only add creates and updates to sync batches
        if (item.action !== 'delete') {
          acc[item.table].push(item.data);
        }
        
        return acc;
      }, {} as Record<string, any[]>);
      
      // Process each table's syncs
      for (const [table, items] of Object.entries(groupedSyncs)) {
        if (items.length > 0) {
          await syncData(table, items);
        }
      }
      
      // Handle deletes separately if needed
      // This would require additional server endpoints
      
      // Clear synced items
      const tx = db.transaction('pendingSync', 'readwrite');
      for (const item of pendingSyncs) {
        await tx.store.delete(item.id);
      }
      await tx.done;
      
      // Update pending count
      const count = await db.count('pendingSync');
      setPendingSyncCount(count);
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncError(error instanceof Error ? error : new Error('Sync failed'));
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    isOnline,
    isSyncing,
    syncError,
    pendingSyncCount,
    addItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    performSync,
  };
}
