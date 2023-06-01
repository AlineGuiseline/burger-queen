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

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const response = await getProducts(token);
      const listaProdutos = await response.json();
      setProducts(listaProdutos);
    }
    fetchData();
  }, []);

  return (
    <section className="bodyMenu">
      <img className="logoMenu" src={Logo} alt="logoBurguerQueen" />
      <div className="mainMenu">
        <div className="options">
          <InfoBoxTitle item="Café da manhã" />
          <InfoBoxTitle item="Almoço" />
          <InfoBoxTitle item="Bebidas" />
          <InfoBoxTitle item="Sobremesas" />
        </div>

        <div className="products">
          {products.map((product) => (
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
            <ItemOrder orderItem={orderItem} />
          </div>
          <Button> Enviar para a Cozinha </Button>
        </div>
      </div>
    </section>
  );
}

export default Menu;
