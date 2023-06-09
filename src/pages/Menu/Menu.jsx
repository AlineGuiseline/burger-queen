/* eslint-disable max-len */
import { React, useEffect, useState } from 'react';
import InfoBox from '../../components/InfoBox/InfoBox';
import InfoBoxTitle from '../../components/InfoBoxTitle/InfoBoxTitle';
import Logo from '../../assets/logo.png';
import Input from '../../components/Input/Input';
import getProducts from '../../api/products';
import ItemOrder from '../../components/ItemOrder/ItemOrder';
import { createOrder } from '../../api/orders';
import { getLocalStorageItem } from '../../storage/localStorage';

import './Menu.css';
import LogoutButton from '../../components/LogoutButton/LogoutButton';

function Menu() {
  const [products, setProducts] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [showProducts, setShowProducts] = useState(false);
  const [clientName, setName] = useState('');
  // criar estado para armazenar produtos filtrados CHECK
  // função que recebe como parâmetro o tipo de produto -- faz o filtro CHECK
  // adicionar o onClick com a função da filtragem CHECK
  // faz o map nos produtos selecionados CHECK

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
    // verificar se getIndex existe => quantity + 1
    // se não existe iniciar com 1
    const getIndex = orderItem.findIndex((order) => order.id === item.id);
    const newOrder = [...orderItem];
    // O método findIndex() retorna -1 quando o elemento não é encontrado no array, e 0 ou um valor positivo quando
    // o elemento é encontrado. No JavaScript, 0 é considerado um valor falso em um contexto booleano.
    // Portanto, a condição if (getIndex) irá falhar quando getIndex for igual a 0, resultando em um comportamento
    // incorreto. Para corrigir isso, você deve verificar explicitamente se getIndex é maior ou igual a 0:
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
      const orderId = getLocalStorageItem('id'); // se der algum problema, voltar nesta linha, pq ela foi colocada depois

      if (clientName === '') {
        throw new Error('Por favor, insira o nome do cliente');
      }
      if (orderItem.length <= 0) {
        throw new Error('Por favor, insira ao menos 1 item ao pedido');
      }
      const response = await createOrder(orderId, orderItem, clientName, waiterId, token);
      const orderData = await response.json();
      console.log(orderData);
      alert('Pedido enviado à cozinha com sucesso');
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <section className="bodyMenu">
      <div className="imagensHeader">
        <img className="logoMenu" src={Logo} alt="logoBurguerQueen" />
        <LogoutButton />
      </div>
      <div className="mainMenu">
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
