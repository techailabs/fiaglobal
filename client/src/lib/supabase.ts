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
    throw new Error('Login failed');
  }
  
  const data = await response.json();
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
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
