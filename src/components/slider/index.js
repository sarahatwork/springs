import React from 'react';

import s from './slider.module.css';

function Slider({ images }) {
  return (
    <div className={s.wrapper}>
      {images.map(({ src, alt }) => (
        <div className={s.imgWrapper}>
          <img src={src} key={src} alt={alt} />
        </div>
      ))}
    </div>
  );
}

export default Slider;
