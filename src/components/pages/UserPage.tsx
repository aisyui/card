import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navigation from '../common/Navigation';
import CardGrid from '../card/CardGrid';
import UserProfile from '../user/UserProfile';
import SpecialCard from '../card/SpecialCard';
import { fetchUsers, fetchUserCards, fetchUser } from '../../utils/api';

export default function UserPage() {
  const { username } = useParams<{ username: string }>();
  
  // First get users list to find the user ID
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  });

  const userId = users?.data.find(u => u.username === username)?.id;
  
  // Then fetch full user data from API to get planet value
  const { data: userResponse } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId!),
    enabled: !!userId,
  });
  
  const user = userResponse?.data || users?.data.find(u => u.username === username);
  
  const { data: cards, isLoading: cardsLoading } = useQuery({
    queryKey: ['userCards', user?.id],
    queryFn: () => fetchUserCards(user!.id),
    enabled: !!user?.id,
  });

  if (!user && !isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-xl">User not found</div>
        </div>
      </div>
    );
  }

  if (!user) {
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
      <Navigation username={username} />
      
      <div className="max-w-6xl mx-auto px-4">
        <UserProfile user={user} cards={cards?.data || []} />
        
        {cardsLoading ? (
          <div className="text-center py-8">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-yellow-500"></i>
          </div>
        ) : (
          <>
            {/* Favorite Card Section */}
            {user.fav && user.fav !== '0' && cards?.data && (
              (() => {
                const favCard = cards.data.find(card => card.id === parseInt(user.fav || '0'));
                if (favCard) {
                  return (
                    <div className="mb-8">
                      <div className="flex justify-center">
                        <SpecialCard card={favCard} />
                      </div>
                    </div>
                  );
                }
                return null;
              })()
            )}
            
            <CardGrid cards={cards?.data || []} user={user} />
          </>
        )}
      </div>
    </div>
  );
}