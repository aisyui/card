import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { fetchUsers } from '../utils/api';
import type { User } from '../types';

// Separate function for cached data
const fetchCachedUsers = async (): Promise<{ data: User[] }> => {
  try {
    const cachedResponse = await axios.get('/json/user.json');
    const userMap = cachedResponse.data;
    
    const cachedUsers: User[] = Object.entries(userMap).map(([username, id]) => ({
      id: parseInt(id as string),
      username,
      did: '',
      aiten: 0,
      handle: '',
      created_at: '',
      model: false,
      fav: '0'
    }));

    return { data: cachedUsers };
  } catch (error) {
    console.error('Failed to fetch cached users:', error);
    return { data: [] };
  }
};

export const useUserData = () => {
  // First query for cached data (fast)
  const cachedQuery = useQuery({
    queryKey: ['users', 'cached'],
    queryFn: fetchCachedUsers,
    staleTime: 0,
    refetchOnMount: false,
  });

  // Second query for fresh data (slower but complete)
  const freshQuery = useQuery({
    queryKey: ['users', 'fresh'],
    queryFn: () => fetchUsers(),
    enabled: !!cachedQuery.data, // Only start after cached data is loaded
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Return fresh data if available, otherwise cached data
  return {
    data: freshQuery.data || cachedQuery.data,
    isLoading: cachedQuery.isLoading,
    isFetching: freshQuery.isFetching,
    error: freshQuery.error || cachedQuery.error,
  };
};