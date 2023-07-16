import { React, useState, useEffect } from 'react';
import { formatDistance, differenceInMinutes } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLocalStorageItem } from '../../utils/localStorage';
import styles from './Kitchen.module.css';
import { showOrders, editOrder } from '../../api/orders';
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

      setOrders(ordersList.filter((order) => order.status === 'pendente'));
    }
    fetchData();
  }, []);

  const changeStatus = async (order) => {
    try {
      const token = getLocalStorageItem('token');
      const response = await editOrder(token, order.id, 'pronto para envio');
      const editList = await response.json();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      toast.success(`Order completed on ${formatDistance(new Date(), new Date(order.dateEntry))}.`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <main>
      <header className={styles.header}>
        <ToastContainer
          autoClose={3000}
        />
        <img src={logo} className={styles.logoKitchen} alt="logo-burger-queen" />
        <LogoutButton />
      </header>
      <section className={styles.orders}>
        {orders.map((order) => (
          <div key={order.id} className={styles.ordersKitchen}>
            <div>
              <Paragraph>Cliente: {order.client}</Paragraph>
              <ul>
                {order.products.map((product) => (
                  <li key={product.id}>
                    <div className={styles.paragraph}>
                      <Paragraph>{product.quantity}</Paragraph>
                      <Paragraph>{product.name}</Paragraph>
                    </div>
                  </li>
                ))}
              </ul>
              <Paragraph>Status: {order.status}</Paragraph>
              <Paragraph>
                Recebido há {differenceInMinutes(new Date(), new Date(order.dateEntry))} minutos
              </Paragraph>
            </div>
            <Button
              onClick={() => changeStatus(order)}
            >
              Marcar como Pronto
            </Button>
          </div>
        ))}
      </section>
    </main>
  );
}
export default Kitchen;
