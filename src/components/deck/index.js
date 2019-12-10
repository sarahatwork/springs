import React from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import s from './deck.module.css';

const CARDS = [
  'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
  'https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg',
  'https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg',
  'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg'
];

const to = i => ({
  x: 0,
  y: i * -20,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ x: 0, y: 0, rot: 0 });

function Deck({ cards = CARDS }) {
  const [springs] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i)
  }));
  return (
    <div className={s.wrapper}>
      {springs.map(({ x, y, rot }, i) => {
        return (
          <animated.div
            key={i}
            className={s.cardWrapper}
            style={{
              transform: interpolate(
                [x, y, rot],
                (x, y, rot) =>
                  `translate3d(${x}px, ${y}px, 0) rotateZ(${rot}deg)`
              )
            }}
          >
            <img src={cards[i]} alt="cart" />
          </animated.div>
        );
      })}
    </div>
  );
}

export default Deck;
