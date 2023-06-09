import { React, useState, useEffect } from 'react';
import { getLocalStorageItem } from '../../storage/localStorage';
import './Kitchen.css';
import { showOrders } from '../../api/orders';
import logo from '../../assets/logo.png';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import Paragraph from '../../components/Paragraph/Paragraph';

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
            <Paragraph>Cliente:{order.client}</Paragraph>
            <ul>
              {order.products.map((product) => (
                <li key={product.id}>
                  <Paragraph>Nome do Produto:{product.name}</Paragraph>
                  <Paragraph>Quantidade:{product.quantity}</Paragraph>
                </li>
              ))}
            </ul>
            <Paragraph>Status:{order.status}</Paragraph>
            <Paragraph>Data de entrada:{order.dateEntry}</Paragraph>
          </div>
        ))}
      </section>
    </main>
  );
}
export default Kitchen;
