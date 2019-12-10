import React, { useRef } from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import s from './deck.module.css';

// https://codesandbox.io/embed/j0y0vpz59

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
const from = i => ({ x: 0, y: -1000, rot: 0 });

function Deck({ cards = CARDS }) {
  const gone = useRef([]);
  const [springs, set] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i)
  }));

  const bind = useDrag(
    ({ args: [index], movement: [mx], direction: [xDir], down, velocity }) => {
      if (velocity > 0.2 && !down) {
        gone.current.push(index);
      }
      const dir = xDir < 0 ? -1 : 1;

      set(i => {
        if (index !== i) return;

        const isGone = gone.current.includes(i);
        let x;
        if (isGone) {
          x = (200 + window.innerWidth) * dir;
        } else {
          x = down ? mx : 0;
        }

        return { x, config: { friction: 50 } };
      });
      if (!down && gone.current.length === cards.length) {
        setTimeout(() => {
          gone.current = [];
          set(i => to(i));
        }, 600);
      }
    }
  );

  return (
    <div className={s.wrapper}>
      {springs.map(({ x, y, rot }, i) => {
        return (
          <animated.div
            key={i}
            className={s.cardWrapper}
            {...bind(i)}
            style={{
              transform: interpolate(
                [x, y, rot],
                (x, y, rot) =>
                  `translate3d(${x}px, ${y}px, 0) rotateZ(${rot}deg)`
              )
            }}
          >
            <span style={{ backgroundImage: `url(${cards[i]})` }} />
          </animated.div>
        );
      })}
    </div>
  );
}

export default Deck;
