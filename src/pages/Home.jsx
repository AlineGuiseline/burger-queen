import React from 'react';
import './Home.css';
import Logo from '../assets/logo.png';
import Button from '../components/Button';

function Home() {
  return (
    <div className="bodyHome">
      <section className="container">
        <img alt="logo-imagem" src={Logo} className="logoImage" />
        <form>
          <label className="labelForm">E-mail</label>
          <div>
            <input type="email" placeholder="email@exemplo.com" className="inputForm" />
          </div>
          <label className="labelForm">Senha</label>
          <div>
            <input type="password" placeholder="******" className="inputForm" />
          </div>
        </form>
        <Button nome="Login" />

      </section>
    </div>
  );
}

export default Home;
