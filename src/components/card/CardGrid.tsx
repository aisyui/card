import { useState } from 'react';
import type { Card, User } from '../../types';
import { SKILL_ICONS, CARD_STATUS_COLORS } from '../../utils/constants';

interface CardGridProps {
  cards: Card[];
  user?: User;
}

export default function CardGrid({ cards }: CardGridProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [sortBy, setSortBy] = useState<'time' | 'cp' | 'card'>('time');

  const sortedCards = [...cards].sort((a, b) => {
    switch (sortBy) {
      case 'cp':
        return b.cp - a.cp;
      case 'card':
        return b.card - a.card;
      default:
        return b.id - a.id; // newest first
    }
  });

  const getSkillIcon = (skill: Card['skill']) => {
    const iconClass = SKILL_ICONS[skill];
    if (skill === 'model') {
      return <i className="fa-solid fa-cube"></i>;
    }
    return <span className={iconClass}></span>;
  };

  const getCardImage = (card: Card) => {
    if (card.author === 'yui') {
      return `/card/card_origin2_${card.card}.webp`;
    } else if (card.author) {
      return `/card/card_origin_${card.card}.webp`;
    }
    return `/card/card_${card.card}.webp`;
  };

  const isSpecialStatus = (status: Card['status']) => {
    return status !== 'normal';
  };

  return (
    <div>
      {/* Control Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setSortBy('time')}
          className={`btn ${sortBy === 'time' ? 'bg-secondary' : ''}`}
        >
          new
        </button>
        <button 
          onClick={() => setSortBy('cp')}
          className={`btn ${sortBy === 'cp' ? 'bg-secondary' : ''}`}
        >
          cp
        </button>
        <button 
          onClick={() => setSortBy('card')}
          className={`btn ${sortBy === 'card' ? 'bg-secondary' : ''}`}
        >
          card
        </button>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className={`btn ${showInfo ? 'bg-secondary' : ''}`}
        >
          info
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sortedCards.map((card) => (
          <div key={card.id} className="text-center">
            {isSpecialStatus(card.status) ? (
              <div className="relative mb-2">
                <div className="card-wrapper">
                  <div className="card-reflection">
                    <img 
                      src={getCardImage(card)}
                      alt={`Card ${card.card}`}
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div className={`card-status ${CARD_STATUS_COLORS[card.status]}`}></div>
                </div>
              </div>
            ) : (
              <div className="mb-2">
                {card.card === 43 ? (
                  <a href="/book/1/ZGlkOnBsYzo0aHFqZm43bTZuNWhubzNkb2FtdWhnZWY/index.html">
                    <img 
                      src={getCardImage(card)}
                      alt={`Card ${card.card}`}
                      className="w-full rounded-lg hover:shadow-lg transition-shadow"
                    />
                  </a>
                ) : (
                  <div className={card.author ? 'relative' : ''}>
                    <img 
                      src={getCardImage(card)}
                      alt={`Card ${card.card}`}
                      className="w-full rounded-lg"
                    />
                    {card.author && (
                      <div className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">
                        @{card.author}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="text-sm">
              <div className="flex items-center justify-center gap-1 mb-1">
                {getSkillIcon(card.skill)}
                <span>{card.cp}</span>
              </div>
              
              {showInfo && (
                <div className="text-xs text-gray-600">
                  <div>ID {card.card}</div>
                  <div>CID {card.id}</div>
                  <div>{card.skill}</div>
                  <div>✧ {card.status}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}