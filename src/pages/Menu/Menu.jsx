import { React, useEffect } from 'react';
import InfoBox from '../../components/InfoBox/InfoBox';
import InfoBoxTitle from '../../components/InfoBoxTitle/InfoBoxTitle';
import Logo from '../../assets/logo.png';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import getProducts from '../../api/products';

// import Paragraph from '../../components/Paragraph/Paragraph';

import './Menu.css';

function Menu() {
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const response = await getProducts(token);
      const listaProdutos = await response.json();
      console.log(listaProdutos);
    }
    fetchData();
  });
  return (
    <section className="bodyMenu">
      <img className="logoMenu" src={Logo} alt="logoBurguerQueen" />
      <div className="mainMenu">
        <div className="optionsBreakfast">
          <InfoBoxTitle item="Café da Manhã" />
          <InfoBox item="Café americano" valor="R$5" />
          <InfoBox item="Café com leite" valor="R$7" />
          <InfoBox item="Sanduíche de presunto e queijo" valor="R$10" />
          <InfoBox item="Suco de fruta natural" valor="R$7" />
          <div className="legenda">
            <p className="legBurgers">Sanduíches</p>
            <p className="legAcompanhamentos">Acompanhamentos</p>
            <p className="legBebidas">Bebidas</p>
          </div>
        </div>
        <div className="optionsLunch">
          <InfoBoxTitle item="Almoço" />
          {/* <Paragraph text="Sanduíches" /> */}
          <InfoBox item="Hambúrguer simples" valor="R$10" cor="#FD7FAA" />
          <InfoBox item="Hambúrguer duplo" valor="R$15" cor="#FD7FAA" />
          {/* <Paragraph text="Acompanhamentos" /> */}
          <InfoBox item="Batata frita" valor="R$5" cor="#FFA7C5" />
          <InfoBox item="Anéis de cebola" valor="R$5" cor="#FFA7C5" />
          {/* <Paragraph text="Bebidas" /> */}
          <InfoBox item="Água 500ml" valor="R$5" cor="#FFCCDD" />
          <InfoBox item="Água 750ml" valor="R$7" cor="#FFCCDD" />
          <InfoBox item="Bebida gaseificada 500ml" valor="R$7" cor="#FFCCDD" />
          <InfoBox item="Bebida gaseificada 750ml" valor="R$10" cor="#FFCCDD" />
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
              // onChange={props.onChange}
              name="nome"
              placeholder="Nome do Cliente"
            />
            <div className="pedidoItem">
              <p>Exemplo</p>
            </div>
          </div>
          <p className="total">Total: R$89,00</p>
          <Button> Enviar para a Cozinha </Button>
        </div>
      </div>
    </section>
  );
}

export default Menu;
