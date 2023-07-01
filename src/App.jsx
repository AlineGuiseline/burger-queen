import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,

} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './pages/Login/Login';
import Menu from './pages/Menu/Menu';
import Kitchen from './pages/Kitchen/Kitchen';
import ReadyOrders from './pages/ReadyOrders/ReadyOrders';
import Homepage from './pages/Admin/Homepage/Homepage';
import Employees from './pages/Admin/Employees/Employees';
import Products from './pages/Admin/Products/Products';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          path="/menu"
          element={(
            <ProtectedRoute roles={['waiter']}>
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
        <Route
          path="/ready_orders"
          element={(
            <ProtectedRoute roles={['waiter']}>
              <ReadyOrders />
            </ProtectedRoute>
)}
        />
        <Route
          path="/homepage"
          element={(
            <ProtectedRoute roles={['admin']}>
              <Homepage />
            </ProtectedRoute>
)}
        />
        <Route
          path="/employees"
          element={(
            <ProtectedRoute roles={['admin']}>
              <Employees />
            </ProtectedRoute>
)}
        />
        <Route
          path="/products"
          element={(
            <ProtectedRoute roles={['admin']}>
              <Products />
            </ProtectedRoute>
)}
        />
      </Routes>
    </Router>
  );
}

export default App;
