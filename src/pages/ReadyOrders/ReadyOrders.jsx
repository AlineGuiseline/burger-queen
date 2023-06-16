import { React, useState, useEffect } from 'react';
import { formatDistance, differenceInMinutes } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showOrders, editOrder } from '../../api/orders';
import { getLocalStorageItem } from '../../storage/localStorage';
import './ReadyOrders.css';
import Paragraph from '../../components/Paragraph/Paragraph';
import MenuIcon from './MenuIcon/MenuIcon';
import Logo from '../../assets/logo.png';
import LogoutButton from '../../components/LogoutButton/LogoutButton';

function ReadyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = getLocalStorageItem('token');
      const response = await showOrders(token);
      const ordersList = await response.json();
      setOrders(ordersList.filter((order) => order.status === 'pronto para envio'));
    }
    fetchData();
  }, []);

  const changeStatus = async (order) => {
    try {
      const token = getLocalStorageItem('token');
      const response = await editOrder(token, order.id, 'enviado');
      const editList = await response.json();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      toast.success(`The order took ${formatDistance(new Date(), new Date(order.dateEntry))} to be ready. This page will automatically reload.`);
      console.log(editList);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="tudo">
      <header>
        <img className="logoReady" src={Logo} alt="logo_burguer_queen" />
        <LogoutButton />
        <ToastContainer autoClose={3000} />
      </header>
      <div className="btnMenu">
        <MenuIcon />
      </div>
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
              <Paragraph>
                Recebido há {differenceInMinutes(new Date(), new Date(order.dateEntry))} minuto(s)
              </Paragraph>
            </div>
            <button className="botaoPronto" type="submit" onClick={() => changeStatus(order)}>
              Marcar como enviado
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ReadyOrders;
