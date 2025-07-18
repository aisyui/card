import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navigation from '../common/Navigation';
import CardGrid from '../card/CardGrid';
import UserProfile from '../user/UserProfile';
import { fetchUsers, fetchUserCards } from '../../utils/api';

export default function UserPage() {
  const { username } = useParams<{ username: string }>();
  
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  });

  const user = users?.data.find(u => u.username === username);
  
  const { data: cards, isLoading: cardsLoading } = useQuery({
    queryKey: ['userCards', user?.id],
    queryFn: () => fetchUserCards(user!.id),
    enabled: !!user?.id,
  });

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-xl">User not found</div>
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
          <div className="text-center py-8">Loading cards...</div>
        ) : (
          <CardGrid cards={cards?.data || []} user={user} />
        )}
      </div>
    </div>
  );
}