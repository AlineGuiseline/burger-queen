import { React, useEffect, useState } from 'react';
import InfoBox from '../../components/InfoBox/InfoBox';
import InfoBoxTitle from '../../components/InfoBoxTitle/InfoBoxTitle';
import Logo from '../../assets/logo.png';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import getProducts from '../../api/products';
import ItemOrder from '../../components/ItemOrder/ItemOrder';
import { getItem } from '../../storage/localStorage';
import createOrder from '../../api/orders';

// import Paragraph from '../../components/Paragraph/Paragraph';

import './Menu.css';

function Menu() {
  const [products, setProducts] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [showProducts, setShowProducts] = useState(false);
  const [name, setName] = useState('');
  // criar estado para armazenar produtos filtrados CHECK
  // função que recebe como parâmetro o tipo de produto -- faz o filtro CHECK
  // adicionar o onClick com a função da filtragem CHECK
  // faz o map nos produtos selecionados CHECK

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
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

  // A TENTATIVA TÁ AQUIIIII
  const newOrder = async (e) => {
    e.preventDefault();
    try {
      const orderRequest = await createOrder(name);
      console.log(orderRequest);
      getItem('token', orderRequest.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bodyMenu">
      <img className="logoMenu" src={Logo} alt="logoBurguerQueen" />
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
            <form className="form" onSubmit={newOrder}>
              <Input
                value={name}
                whenChanged={(value) => setName(value)}
                name={name}
                placeholder="Nome do cliente"
              />
              <ItemOrder
                orderItem={orderItem}
                onClickQuantity={quantityControl}
              />
              <Button> Enviar para a Cozinha </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
