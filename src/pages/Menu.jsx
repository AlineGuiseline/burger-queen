import React from 'react';
import InfoBox from '../components/InfoBox/InfoBox';
import InfoBoxTitle from '../components/InfoBoxTitle/InfoBoxTitle';
import Logo from '../assets/logo.png';
import Button from '../components/Button/Button';

import './Menu.css';

function Menu() {
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
            <p>um item de legenda</p>
            <p>dois itens de legenda</p>
            <p>tres itens de legenda</p>
          </div>
        </div>
        <div className="optionsLunch">
          <InfoBoxTitle item="Almoço" />
          <InfoBox item="Hambúrguer simples" valor="R$10" />
          <InfoBox item="Hambúrguer duplo" valor="R$15" />
          <InfoBox item="Batata frita" valor="R$5" />
          <InfoBox item="Anéis de cebola" valor="R$5" />
          <InfoBox item="Água 500ml" valor="R$5" />
          <InfoBox item="Água 750ml" valor="R$7" />
          <InfoBox item="Bebida gaseificada 500ml" valor="R$7" />
          <InfoBox item="Bebida gaseificada 750ml" valor="R$10" />
        </div>
      </div>
      <div className="pedidosDesktop">
        <img className="logoMenuSegunda" src={Logo} alt="logoBurguerQueen" />
        <div className="pedidos">
          <div className="resumoPedido">
            <p className="resumo">Resumo do Pedido:</p>
            <p className="pedidoItem">exemplo de pedido</p>
          </div>
          <p className="total">Total: R$89,00</p>
          <Button nome="Enviar para a Cozinha" />
        </div>
      </div>
    </section>
  );
}

export default Menu;
