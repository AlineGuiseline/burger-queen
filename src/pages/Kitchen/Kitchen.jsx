import { React, useState, useEffect } from 'react';
import { getLocalStorageItem } from '../../storage/localStorage';
import './Kitchen.css';
import { showOrders, editOrder } from '../../api/orders';
import logo from '../../assets/logo.png';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import Paragraph from '../../components/Paragraph/Paragraph';
// import Button from '../../components/Button/Button';

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

  const testeClick = async (order) => {
    try {
      const token = getLocalStorageItem('token');
      const response = await editOrder(token, order.id, 'pronto para envio');
      const editList = await response.json();
      window.location.reload();
      console.log(editList);
    } catch (error) {
      throw error;
    }
  };

  return (
    <main>
      <header className="header">
        <img src={logo} className="logoKitchen" alt="logo-burger-queen" />
        <LogoutButton />
      </header>
      <section className="orders">
        {orders.map((order) => (
          <div key={order.id} className="ordersKitchen">
            <div>
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
            </div>
            <button type="submit" onClick={() => testeClick(order)}>Marcar como Pronto</button>
          </div>
        ))}
      </section>
    </main>
  );
}
export default Kitchen;
