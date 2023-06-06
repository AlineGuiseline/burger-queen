import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,

} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './pages/Login/Login';
import Menu from './pages/Menu/Menu';
import Kitchen from './pages/Kitchen/Kitchen';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          path="/menu"
          element={(
            <ProtectedRoute roles={['admin']}>
              <Menu />
            </ProtectedRoute>
)}
        />
        <Route
          path="/kitchen"
          element={(
            <ProtectedRoute roles={['chef']}>
              <Kitchen />
            </ProtectedRoute>
)}
        />
      </Routes>
    </Router>
  );
}

export default App;
