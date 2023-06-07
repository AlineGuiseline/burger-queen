import { React, useState, useEffect } from 'react';
import { setLocalStorageItem } from '../../storage/localStorage';
import './Kitchen.css';
import { showOrders } from '../../api/orders';
import logo from '../../assets/logo.png';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import InfoBox from '../../components/InfoBox/InfoBox';

function Kitchen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = setLocalStorageItem('token');
      const response = await showOrders(token);
      const ordersList = await response.json();
      setOrders(ordersList);
    }

    fetchData();
  }, []);

  return (
    <main>
      <header className="header">
        <img src={logo} className="logoKitchen" alt="logo-burger-queen" />
        <LogoutButton />
      </header>
      <section className="orders">
        {orders.map((order) => (
          <InfoBox
            key={order.id}
            client={order.client}
            products={order.products}
            status={order.status}
            dateEntry={order.dateEntry}
          />
        ))}
      </section>
    </main>
  );
}
export default Kitchen;
