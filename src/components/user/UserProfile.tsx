import type { User, Card } from '../../types';

interface UserProfileProps {
  user: User;
  cards: Card[];
}

export default function UserProfile({ user, cards }: UserProfileProps) {

  return (
    <div className="bg-white rounded-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span>{user.username}</span>
        
        {/* Badges */}
        <span className="text-yellow-500">
          <span className="icon-ai"></span>
        </span>
        
        {cards.find(c => c.card === 65) && (
          <span className="text-yellow-400">
            <span className="icon-ai"></span>
          </span>
        )}
        
        {user.aiten >= 70000000 && (
          <span className="text-yellow-500">
            <span className="icon-power"></span>
          </span>
        )}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
        <div>
          <strong>ID:</strong> {user.id}
        </div>
        <div className="flex items-center gap-1">
          <span className="icon-power"></span>
          {user.aiten?.toLocaleString()}
        </div>
        <div className="flex items-center gap-1">
          <i className="fa-solid fa-cube"></i>
          {cards.filter(c => c.skill === 'lost').length}
        </div>
        <div className="flex items-center gap-1">
          <span className="icon-ai"></span>
          {cards.filter(c => c.card >= 96 && c.card <= 121).length}
        </div>
        <div className="flex items-center gap-1">
          <i className="fa-solid fa-earth-americas"></i>
          {user.planet?.toLocaleString() || '0'}
        </div>
      </div>

      {/* Badge Images */}
      <div className="flex gap-2 mt-4">
        {cards.find(c => c.card === 18) && (
          <img src="/card/badge_1.png" alt="Badge 1" className="w-6 h-6" />
        )}
        {cards.find(c => c.card === 41) && (
          <img src="/card/badge_2.png" alt="Badge 2" className="w-6 h-6" />
        )}
        {cards.find(c => c.card === 45) && (
          <img src="/card/badge_3.png" alt="Badge 3" className="w-6 h-6" />
        )}
        {cards.find(c => c.card === 75) && (
          <img src="/card/badge_4.png" alt="Badge 4" className="w-6 h-6" />
        )}
        {cards.find(c => c.card === 94) && (
          <img src="/card/badge_5.png" alt="Badge 5" className="w-6 h-6" />
        )}
        {cards.filter(c => c.card >= 96 && c.card <= 121).length === 26 && (
          <img src="/card/badge_6.png" alt="Badge 6" className="w-6 h-6" />
        )}
      </div>
    </div>
  );
}