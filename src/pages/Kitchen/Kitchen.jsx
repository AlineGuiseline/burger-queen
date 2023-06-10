import { React, useState, useEffect } from 'react';
import { getLocalStorageItem } from '../../storage/localStorage';
import './Kitchen.css';
import { showOrders } from '../../api/orders';
import logo from '../../assets/logo.png';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import Paragraph from '../../components/Paragraph/Paragraph';
import Button from '../../components/Button/Button';

function Kitchen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = getLocalStorageItem('token');
      const response = await showOrders(token);
      const ordersList = await response.json();
      setOrders(ordersList);
      console.log(ordersList);
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
          <div key={order.id} className="ordersKitchen">
            <Paragraph>Cliente: {order.client}</Paragraph>
            <ul>
              {order.products.map((product) => (
                <li key={product.id}>
                  <div className="paragrafos">
                    <Paragraph>{product.quantity}</Paragraph>
                    <Paragraph>{product.name}</Paragraph>
                  </div>
                </li>
              ))}
            </ul>
            <Paragraph>Status: {order.status}</Paragraph>
            <Paragraph>Data de entrada: {order.dateEntry}</Paragraph>

            <Button>Marcar como Pronto</Button>
          </div>
        ))}
      </section>
    </main>
  );
}
export default Kitchen;
