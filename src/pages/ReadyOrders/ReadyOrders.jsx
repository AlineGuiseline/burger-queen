import React from 'react';
import './ReadyOrders.css';
// import Paragraph from '../../components/Paragraph/Paragraph';
import MenuIcon from './MenuIcon/MenuIcon';
import Logo from '../../assets/logo.png';

function ReadyOrders() {
  return (
    <div>
      <header>
        <img className="logoReady" src={Logo} alt="logo_burguer_queen" />
      </header>
      <main>
        <MenuIcon />
      </main>
    </div>
  );
}

export default ReadyOrders;
