import React, { useRef } from 'react';
import { interpolate, useSprings, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import clamp from 'just-clamp';

import chi1 from '../../chi1.jpeg';
import chi2 from '../../chi2.jpeg';
import chi3 from '../../chi3.jpeg';

import s from './slider.module.css';

// https://codesandbox.io/embed/n9vo1my91p

const IMAGES = [
  {
    src: chi1,
    alt: 'chi1'
  },
  {
    src: chi2,
    alt: 'chi2'
  },
  {
    src: chi3,
    alt: 'chi3'
  }
];

function Slider({ images = IMAGES }) {
  const index = useRef(0);
  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (down && distance > 250) {
        const newIndex = index.current + (xDir > 0 ? -1 : 1);
        cancel((index.current = clamp(newIndex, 0, images.length - 1)));
      }
      set(i => {
        if (i < index.current - 1 || i > index.current + 1) {
          return { display: 'none' };
        }
        const x = (i - index.current) * 500 + (down ? mx : 0);
        const scale = down ? 1 - distance / (500 * 2) : 1;
        return { display: 'block', scale, x };
      });
    }
  );
  const [springs, set] = useSprings(images.length, i => ({
    scale: 1,
    x: i * 500,
    display: 'block'
  }));

  return (
    <div {...bind()} className={s.wrapper}>
      {springs.map(({ display, scale, x }, i) => {
        const { src, alt } = images[i];
        return (
          <animated.div
            key={src}
            style={{
              display,
              transform: interpolate(
                [x, scale],
                (x, s) => `translate3d(${x}px,0,0) scale(${s})`
              )
            }}
          >
            <img src={src} alt={alt} />
          </animated.div>
        );
      })}
    </div>
  );
}

export default Slider;
