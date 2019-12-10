import React from 'react';
import { Router, Link } from '@reach/router';

import Slider from './components/slider';

import chi1 from './chi1.jpeg';
import chi2 from './chi2.jpeg';
import chi3 from './chi3.jpeg';

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

function App() {
  return (
    <>
      <nav>
        <Link to="/">home</Link> <Link to="/slider">slider</Link>
      </nav>
      <Router>
        <Slider images={IMAGES} path="/slider" />
      </Router>
    </>
  );
}

export default App;
