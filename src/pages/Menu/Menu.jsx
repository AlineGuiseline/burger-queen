/* eslint-disable max-len */
import { React, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfoBox from '../../components/InfoBox/InfoBox';
import InfoBoxTitle from '../../components/InfoBoxTitle/InfoBoxTitle';
import Logo from '../../assets/logo.png';
import Input from '../../components/Input/Input';
import { getProducts } from '../../api/products';
import ItemOrder from '../../components/ItemOrder/ItemOrder';
import { createOrder } from '../../api/orders';
import { getLocalStorageItem } from '../../utils/localStorage';

import styles from './Menu.module.css';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import CheckIcon from './CheckIcon/CheckIcon';

function Menu() {
  const [products, setProducts] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [showProducts, setShowProducts] = useState(false);
  const [clientName, setName] = useState('');

  useEffect(() => {
    async function fetchData() {
      const token = getLocalStorageItem('token');
      const response = await getProducts(token);
      const listaProdutos = await response.json();
      setProducts(listaProdutos);
    }
    fetchData();
  }, []);

  const filteredCategory = (categoria) => {
    setFilterCategory(categoria);
    setShowProducts(true);
  };

  const filteredProducts = filterCategory
    ? products.filter((product) => product.type === filterCategory)
    : products;

  const quantityControl = (item, children) => {
    const getIndex = orderItem.findIndex((order) => order.id === item.id);
    const newOrder = [...orderItem];
    const specificItem = newOrder[getIndex];

    if (children === '-') {
      if (item.quantity <= 1) {
        newOrder.splice(getIndex, 1);
      } else {
        const valueChange = specificItem.quantity - 1;
        newOrder[getIndex].quantity = valueChange;
      }
    }
    if (children === '+') {
      const valueChange = specificItem.quantity + 1;
      newOrder[getIndex].quantity = valueChange;
    }
    setOrderItem(newOrder);
  };

  function addItem(item) {
    const getIndex = orderItem.findIndex((order) => order.id === item.id);
    const newOrder = [...orderItem];
    if (getIndex >= 0) {
      const specificItem = newOrder[getIndex];
      const quantityChange = specificItem.quantity + 1;
      newOrder[getIndex].quantity = quantityChange;
      setOrderItem(newOrder);
    } else {
      const product = { ...item, quantity: 1 };
      setOrderItem([...newOrder, product]);
    }
  }

  const isValidOrder = () => {
    if (clientName === '') {
      throw new Error('Por favor, insira o nome do cliente');
    }
    if (orderItem.length <= 0) {
      throw new Error('Por favor, insira ao menos 1 item ao pedido');
    }
  };

  const newOrder = async () => {
    try {
      const waiterId = getLocalStorageItem('userId');
      const token = getLocalStorageItem('token');
      const orderId = getLocalStorageItem('id');

      isValidOrder();

      const response = await createOrder(orderId, orderItem, clientName, waiterId, token);
      const orderData = await response.json();

      if (response.status === 201) {
        toast.success('Pedido enviado à cozinha com sucesso!');
        setOrderItem([]);
        setName('');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <section className={styles.bodyMenu}>
      <header className={styles.headerImages}>
        <LogoutButton />
        <img className={styles.logoMenu} src={Logo} alt="logoBurguerQueen" />
      </header>
      <div className={styles.mainMenu}>
        <div className={styles.buttonReady}>
          <CheckIcon />
        </div>
        <div className={styles.options}>
          <InfoBoxTitle item="Café da manhã" onClick={() => filteredCategory('Café da manhã')} />
          <InfoBoxTitle item="Almoço" onClick={() => filteredCategory('Almoço')} />
          <InfoBoxTitle item="Bebidas" onClick={() => filteredCategory('Bebidas')} />
          <InfoBoxTitle item="Sobremesas" onClick={() => filteredCategory('Sobremesas')} />
        </div>

        <div className={styles.products}>
          {showProducts
          && filteredProducts.map((product) => (
            <InfoBox
              key={product.id}
              item={product.name}
              valor={product.price}
              onClick={() => addItem(product)}
            />
          ))}
          <ToastContainer
            autoClose={1500}
          />
        </div>
      </div>

      <div className={styles.desktopOrders}>
        <img className={styles.logoMenuDesktop} src={Logo} alt="logoBurguerQueen" />
        <div className={styles.orders}>
          <section className={styles.ordersResume}>
            <p className={styles.resume}>Resumo do Pedido:</p>
            <Input
              value={clientName}
              whenChanged={(value) => setName(value)}
              name={clientName}
              placeholder="Nome do cliente"
            />
          </section>
          <ItemOrder
            orderItem={orderItem}
            onClickQuantity={quantityControl}
            onClick={newOrder}
          />
        </div>
      </div>
    </section>
  );
}

export default Menu;
