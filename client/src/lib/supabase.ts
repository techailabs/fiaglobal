import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication functions
export const signIn = async (email: string, password: string) => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch('/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
};

export const getCurrentUser = async () => {
  const response = await fetch('/api/user', {
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Failed to get current user');
  }

  return response.json();
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

// Database helper functions for offline support
export const syncData = async (
  table: string,
  localData: any[],
  idField: string = 'id'
) => {
  const { data, error } = await supabase
    .from(table)
    .upsert(localData, { onConflict: idField });
  
  if (error) throw error;
  return data;
};

export const fetchTable = async (
  table: string,
  query?: { column: string; value: any }[]
) => {
  let queryBuilder = supabase.from(table).select('*');
  
  if (query) {
    query.forEach(({ column, value }) => {
      queryBuilder = queryBuilder.eq(column, value);
    });
  }
  
  const { data, error } = await queryBuilder;
  if (error) throw error;
  return data;
};