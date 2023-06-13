import { React, useState, useEffect } from 'react';
import { formatDistance, differenceInMinutes } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      // window.location.reload();
      toast.success(`Order completed on ${formatDistance(new Date(), new Date(order.dateEntry))}`);
      console.log(editList);
    } catch (error) {
      throw error;
    }
  };

  return (
    <main>
      <header className="header">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
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
              <Paragraph>
                Recebido hà {differenceInMinutes(new Date(), new Date(order.dateEntry))} minutos
              </Paragraph>
            </div>
            <button className="botaoPronto" type="submit" onClick={() => testeClick(order)}>Marcar como Pronto</button>
          </div>
        ))}
      </section>
    </main>
  );
}
export default Kitchen;
