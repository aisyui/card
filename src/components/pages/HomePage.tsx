import { useQuery, useQueries } from '@tanstack/react-query';
import Navigation from '../common/Navigation';
import { fetchUsers, fetchUserCards } from '../../utils/api';
import SpecialCard from '../card/SpecialCard';
import type { Card } from '../../types';

export default function HomePage() {
  
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers()
  });

  // Get all users with fav cards
  const usersWithFav = users?.data?.filter(user => user.fav && user.fav !== '0') || [];
  
  // Fetch cards for each user with fav
  const favCardQueries = useQueries({
    queries: usersWithFav.map(user => ({
      queryKey: ['userCards', user.id],
      queryFn: () => fetchUserCards(user.id),
      enabled: !!user.id
    }))
  });

  // Extract fav cards
  const favCards: { user: typeof usersWithFav[0], card: Card }[] = [];
  usersWithFav.forEach((user, index) => {
    const userCards = favCardQueries[index]?.data?.data;
    if (userCards && user.fav) {
      const favCard = userCards.find(card => card.id === parseInt(user.fav));
      if (favCard) {
        favCards.push({ user, card: favCard });
      }
    }
  });

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

        {/* Favorite Cards Section */}
        {favCards.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Favorite Cards</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {favCards.map(({ user, card }) => (
                <div key={`${user.id}-${card.id}`}>
                  <SpecialCard card={card} />
                  <div className="text-center text-sm mt-2">
                    <a href={`/${user.username}`} className="text-gray-600 hover:text-primary">
                      @{user.username}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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