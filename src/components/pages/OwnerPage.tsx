import { useQuery } from '@tanstack/react-query';
import Navigation from '../common/Navigation';
import { fetchCardData } from '../../utils/api';

export default function OwnerPage() {
  const { data: cardData, isLoading } = useQuery({
    queryKey: ['cardData'],
    queryFn: fetchCardData,
  });

  const specialCards = [22, 25, 26, 27, 29, 33, 36, 39, 40, 41, 44, 45];

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center py-8">
          <i className="fa-solid fa-spinner fa-spin text-6xl text-yellow-500"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cardData?.data.map((card) => {
            const shouldShow = card.id < 15 || specialCards.includes(card.id);
            
            if (!shouldShow) return null;

            const isBlackCard = [22, 27, 29, 33, 36].includes(card.id) && card.owner === 'none';

            return (
              <div key={card.id} className="bg-white rounded-lg p-6">
                <button 
                  id={card.id.toString()}
                  className="btn mb-4"
                >
                  card : {card.id} / {card.h}
                </button>
                
                <div className={`mb-4 ${isBlackCard ? 'bg-black p-4 rounded' : ''}`}>
                  <img 
                    src={`/card/card_${card.id}.webp`}
                    alt={`Card ${card.id}`}
                    className={`w-48 mx-auto ${isBlackCard ? 'opacity-70' : ''}`}
                  />
                </div>

                <p className="text-center">
                  {card.owner ? (
                    <>
                      owner : <a href={`/${card.owner}`} className="text-primary hover:text-secondary">
                        {card.owner}
                      </a>
                    </>
                  ) : (
                    <>owner : none</>
                  )}
                </p>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}