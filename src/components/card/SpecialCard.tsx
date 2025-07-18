import { Card } from '../../types';
import '../../styles/card-effects.css';

interface SpecialCardProps {
  card: Card;
  className?: string;
}

export default function SpecialCard({ card, className = '' }: SpecialCardProps) {
  const isSpecialStatus = ['yui', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seven'].includes(card.status);
  
  if (!isSpecialStatus) {
    return (
      <div className={`text-center ${className}`}>
        <div className="relative mb-2">
          <div className="card-wrapper">
            <div className="card-reflection">
              <img 
                src={`/card/card_${card.card}.webp`} 
                alt={`Card ${card.card}`}
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex items-center justify-center gap-1 mb-1">
            {card.skill === 'critical' && <span className="icon-sandar"></span>}
            {card.skill === 'post' && <span className="icon-moon"></span>}
            {card.skill === 'luck' && <span className="icon-api"></span>}
            {card.skill === 'ten' && <span className="icon-power"></span>}
            {card.skill === 'lost' && <span>●</span>}
            {card.skill === 'dragon' && <span className="icon-home"></span>}
            {card.skill === 'nyan' && <span>▲</span>}
            {card.skill === 'yui' && <span className="icon-ai"></span>}
            {card.skill === '3d' && <span>■</span>}
            {card.skill === 'model' && <i className="fa-solid fa-cube"></i>}
            {card.skill === 'first' && <span className="icon-moji_a"></span>}
            <span>{card.cp}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="relative mb-2">
        <div className="card-wrapper">
          <div className="card-reflection">
            <img 
              src={`/card/card_${card.card}.webp`} 
              alt={`Card ${card.card}`}
              className="w-full rounded-lg"
            />
          </div>
          <div className={`card-status pattern-${card.status}`}></div>
          <div className={`card-status color-${card.status}`}></div>
        </div>
      </div>
      <div className="text-sm">
        <div className="flex items-center justify-center gap-1 mb-1">
          {card.skill === 'critical' && <span className="icon-sandar"></span>}
          {card.skill === 'post' && <span className="icon-moon"></span>}
          {card.skill === 'luck' && <span className="icon-api"></span>}
          {card.skill === 'ten' && <span className="icon-power"></span>}
          {card.skill === 'lost' && <span>●</span>}
          {card.skill === 'dragon' && <span className="icon-home"></span>}
          {card.skill === 'nyan' && <span>▲</span>}
          {card.skill === 'yui' && <span className="icon-ai"></span>}
          {card.skill === '3d' && <span>■</span>}
          {card.skill === 'model' && <i className="fa-solid fa-cube"></i>}
          {card.skill === 'first' && <span className="icon-moji_a"></span>}
          <span>{card.cp}</span>
        </div>
      </div>
    </div>
  );
}