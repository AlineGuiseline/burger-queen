import { React, useState, useEffect } from 'react';
import { formatDistance, differenceInMinutes } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLocalStorageItem, setLocalStorageItem } from '../../storage/localStorage';
import './Kitchen.css';
import { showOrders, editOrder } from '../../api/orders';
import logo from '../../assets/logo.png';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import Paragraph from '../../components/Paragraph/Paragraph';
// import Button from '../../components/Button/Button';

function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [removedOrderIds, setRemovedOrderIds] = useState([]);

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

  const removeOrderFromList = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    setRemovedOrderIds((prevIds) => [...prevIds, orderId]);
    setLocalStorageItem('removedOrderIds', JSON.stringify([...removedOrderIds, orderId]));
  };

  const changeStatus = async (order) => {
    try {
      const token = getLocalStorageItem('token');
      const response = await editOrder(token, order.id, 'pronto para envio');
      const editList = await response.json();
      // window.location.reload();
      toast.success(`The order took ${formatDistance(new Date(), new Date(order.dateEntry))} to be ready.`);
      console.log(editList);

      removeOrderFromList(order.id);
    } catch (error) {
      throw error;
    }
  };

  // Recupera a lista de IDs dos pedidos removidos do armazenamento local ao montar o componente
  useEffect(() => {
    const removedOrderIdsString = getLocalStorageItem('removedOrderIds');
    if (removedOrderIdsString) {
      const removedOrders = JSON.parse(removedOrderIdsString);
      setRemovedOrderIds(removedOrders);
    }
  }, []);

  return (
    <main>
      <header className="header">
        <ToastContainer autoClose={3000} />
        <img src={logo} className="logoKitchen" alt="logo-burger-queen" />
        <LogoutButton />
      </header>
      <section className="orders">
        {orders.map((order) => {
          // Verifica se o ID do pedido está na lista de pedidos removidos
          if (removedOrderIds.includes(order.id)) {
            return null; // Não exibe o pedido na interface
          }

          return (
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
                Marcar como Pronto
              </button>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Kitchen;
