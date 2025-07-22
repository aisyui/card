import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCardById } from '../../utils/api';
import '../../styles/card-effects.css';
import '../../styles/card-fullscreen.css';

export default function CardDisplayPage() {
  const { id } = useParams<{ id: string }>();
  const cardId = parseInt(id || '0');

  const { data: card, isLoading } = useQuery({
    queryKey: ['card', cardId],
    queryFn: () => fetchCardById(cardId),
    enabled: cardId > 0,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <i className="fa-solid fa-spinner fa-spin text-6xl text-yellow-500"></i>
      </div>
    );
  }

  if (!card) {
    return null;
  }

  const isSpecialStatus = ['yui', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seven'].includes(card.status);

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ 
        background: 'linear-gradient(to bottom, #1a1a1a, #2d2d2d, #1a1a1a)',
        backgroundColor: '#1a1a1a'
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative" style={{ maxHeight: '100vh', height: '100vh', width: 'auto' }}>
          <div className="h-full flex flex-col items-center justify-center">
            <div className="card-wrapper-fullscreen" style={{ height: '100vh', width: '100%', maxWidth: 'none', aspectRatio: '5/7' }}>
              <div className="card-reflection">
                <img 
                  src={`/card/card_${card.card}.webp`} 
                  alt={`Card ${card.card}`}
                  className="w-full rounded-lg"
                />
              </div>
              {isSpecialStatus && (
                <>
                  <div className={`card-status pattern-${card.status}`}></div>
                  <div className={`card-status color-${card.status}`}></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}