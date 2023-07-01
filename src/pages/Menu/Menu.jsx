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
import { getLocalStorageItem } from '../../storage/localStorage';

import './Menu.css';
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

    if (children === '-') {
      if (item.quantity <= 1) {
        newOrder.splice(getIndex, 1);
        setOrderItem(newOrder);
      } else {
        const specificItem = newOrder[getIndex];
        const valueChange = specificItem.quantity - 1;
        newOrder[getIndex].quantity = valueChange;
        setOrderItem(newOrder);
      }
    }

    if (children === '+') {
      const specificItem = newOrder[getIndex];
      const quantityChange = specificItem.quantity + 1;
      newOrder[getIndex].quantity = quantityChange;
      setOrderItem(newOrder);
    }
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

  const newOrder = async () => {
    try {
      const token = getLocalStorageItem('token');
      const waiterId = getLocalStorageItem('userId');
      const orderId = getLocalStorageItem('id');

      if (clientName === '') {
        throw new Error('Por favor, insira o nome do cliente');
      }
      if (orderItem.length <= 0) {
        throw new Error('Por favor, insira ao menos 1 item ao pedido');
      }
      const response = await createOrder(orderId, orderItem, clientName, waiterId, token);
      const orderData = await response.json();
      console.log(orderData);

      if (response.status === 201) {
        toast.success('Pedido enviado à cozinha com sucesso!');
        setOrderItem([]);
        setName('');
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <section className="bodyMenu">
      <div className="imagensHeader">
        <LogoutButton />
        <img className="logoMenu" src={Logo} alt="logoBurguerQueen" />
      </div>
      <div className="mainMenu">
        <div className="btnProntos">
          <CheckIcon />
        </div>
        <div className="options">
          <InfoBoxTitle item="Café da manhã" onClick={() => filteredCategory('Café da manhã')} />
          <InfoBoxTitle item="Almoço" onClick={() => filteredCategory('Almoço')} />
          <InfoBoxTitle item="Bebidas" onClick={() => filteredCategory('Bebidas')} />
          <InfoBoxTitle item="Sobremesas" onClick={() => filteredCategory('Sobremesas')} />
        </div>

        <div className="products">
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

      <div className="pedidosDesktop">
        <img className="logoMenuSegunda" src={Logo} alt="logoBurguerQueen" />
        <div className="pedidos">
          <div className="resumoPedido">
            <p className="resumo">Resumo do Pedido:</p>
            <Input
              value={clientName}
              whenChanged={(value) => setName(value)}
              name={clientName}
              placeholder="Nome do cliente"
            />
          </div>
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
