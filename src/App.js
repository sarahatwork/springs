import React from 'react';
import { Router, Link } from '@reach/router';

import Deck from './components/deck';
import Slider from './components/slider';

function App() {
  return (
    <>
      <nav>
        <Link to="/">home</Link> <Link to="/slider">slider</Link>{' '}
        <Link to="/deck">deck</Link>
      </nav>
      <Router>
        <Slider path="/slider" />
        <Deck path="/deck" />
      </Router>
    </>
  );
}

export default App;
