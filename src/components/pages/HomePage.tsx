import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import Navigation from '../common/Navigation';
import { fetchUsersWithCache } from '../../utils/api';
import { api } from '../../utils/api';

export default function HomePage() {
  const queryClient = useQueryClient();
  
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsersWithCache(),
    staleTime: 0, // Always consider data stale
  });

  // Refresh with API data after cache load
  useEffect(() => {
    if (users?.isFromCache) {
      // Fetch fresh data from API in background
      api.get('users?itemsPerPage=8000').then(response => {
        console.log('Background API fetch successful, got', response.data.length, 'users with planet data');
        // Update the query cache with fresh data
        queryClient.setQueryData(['users'], {
          data: response.data,
          isFromCache: false
        });
      }).catch(error => {
        console.error('Background API fetch failed:', error);
      });
    }
  }, [users?.isFromCache, queryClient]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-6xl text-yellow-500"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <a href="/docs" className="btn">help</a>
        </div>

        {users?.data && Array.isArray(users.data) && users.data.length > 0 && (
          <div className="bg-white rounded-lg p-6">
            <div className="grid gap-4">
              {users.data.map((user) => (
                <div key={user.id} className="border-b pb-4 last:border-b-0">
                  <div className="text-lg flex items-center gap-2">
                    <button className="btn-sm">{user.id}</button>
                    <a href={`/${user.username}`} className="font-semibold">
                      {user.username}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}