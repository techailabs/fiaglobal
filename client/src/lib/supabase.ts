
// Authentication functions
export const signIn = async (email: string, password: string) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Network error occurred');
  }
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
  const response = await fetch(`/api/users/${userId}`, {
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Failed to get user profile');
  }

  return response.json();
};

// Database helper functions 
export const fetchTable = async (table: string, query?: { column: string; value: any }[]) => {
  const queryString = query 
    ? '?' + query.map(q => `${q.column}=${encodeURIComponent(q.value)}`).join('&')
    : '';
    
  const response = await fetch(`/api/${table}${queryString}`, {
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${table}`);
  }

  return response.json();
};
