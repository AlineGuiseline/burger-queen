import { React, useEffect, useState } from 'react';
import InfoBox from '../../components/InfoBox/InfoBox';
import InfoBoxTitle from '../../components/InfoBoxTitle/InfoBoxTitle';
import Logo from '../../assets/logo.png';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import getProducts from '../../api/products';
import ItemOrder from '../../components/ItemOrder/ItemOrder';

// import Paragraph from '../../components/Paragraph/Paragraph';

import './Menu.css';

function Menu() {
  const [products, setProducts] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [showProducts, setShowProducts] = useState(false);
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
              onClick={() => setOrderItem((prevState) => [...prevState, product])}
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
              type="text"
              // value="nome"
              // onChange={whenTyped}
              // name="nome"
              placeholder="Nome do Cliente"
            />
            <ItemOrder
              orderItem={orderItem}
              onClickQuantity={quantityControl}
            />
          </div>
          <Button> Enviar para a Cozinha </Button>
        </div>
      </div>
    </section>
  );
}

export default Menu;
