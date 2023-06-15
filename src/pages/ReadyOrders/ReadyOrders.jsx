import { React, useState, useEffect } from 'react';
import { formatDistance, differenceInMinutes } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showOrders, editOrder } from '../../api/orders';
import { getLocalStorageItem, setLocalStorageItem } from '../../storage/localStorage';
import './ReadyOrders.css';
import Paragraph from '../../components/Paragraph/Paragraph';
import MenuIcon from './MenuIcon/MenuIcon';
import Logo from '../../assets/logo.png';
import LogoutButton from '../../components/LogoutButton/LogoutButton';

function ReadyOrders() {
  const [orders, setOrders] = useState([]);
  const [removedOrderIds, setRemovedOrderIds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = getLocalStorageItem('token');
      const response = await showOrders(token);
      const ordersList = await response.json();
      setOrders(ordersList.filter((order) => order.status === 'pronto para envio'));
    }
    fetchData();
  }, []);

  const removeOrderFromList = (orderId) => {
    //  filtrar a lista atual de pedidos (prevOrders) e manter apenas aqueles cujo id é diferente
    // do orderId recebido. Isso remove o pedido da lista.
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    // Atualiza o estado removedOrderIds adicionando o orderId à lista existente.
    // Isso mantém um registro dos pedidos removidos.
    setRemovedOrderIds((prevIds) => [...prevIds, orderId]);
    // Salva a lista atualizada de removedOrderIds no armazenamento local, convertendo-a para uma
    // string JSON.
    setLocalStorageItem('removedOrderIds', JSON.stringify([...removedOrderIds, orderId]));
  };

  const changeStatus = async (order) => {
    try {
      const token = getLocalStorageItem('token');
      const response = await editOrder(token, order.id, 'enviado');
      const editList = await response.json();
      toast.success(`The order took ${formatDistance(new Date(), new Date(order.dateEntry))} to be ready.`);
      console.log(editList);

      removeOrderFromList(order.id);

      console.log('clicou');
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // Obtém a lista de removedOrderIds do armazenamento local como uma string JSON.
    const removedOrderIdsString = getLocalStorageItem('removedOrderIds');
    if (removedOrderIdsString) {
      // Converte a string JSON em um array de pedidos removidos.
      const removedOrders = JSON.parse(removedOrderIdsString);
      setRemovedOrderIds(removedOrders);
    }
  }, []);

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
