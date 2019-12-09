import React from 'react';

function Slider({ images }) {
  return (
    <div>
      {images.map(({ src, alt}) => (
        <img src={src} key={src} alt={alt} />
      ))}
    </div>
  )
}

export default Slider