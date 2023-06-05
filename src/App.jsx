import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,

} from 'react-router-dom';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Kitchen from './pages/Kitchen/Kitchen';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/kitchen" element={<Kitchen />} />
      </Routes>
    </Router>
  );
}

export default App;
