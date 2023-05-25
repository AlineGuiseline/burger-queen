import { React, useState } from 'react';
import './Home.css';
import Logo from '../assets/logo.png';
import Input from '../components/Input';
import Button from '../components/Button';

function Home() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="bodyHome">
      <section className="container">
        <img alt="logo-imagem" src={Logo} className="logoImage" />
        <form>

          {/* <label className="labelForm">E-mail</label>

          <div>
            <input type="email" placeholder="email@exemplo.com" className="inputForm" />
          </div>
          <label className="labelForm">Senha</label>
          <div>
            <input type="password" placeholder="******" className="inputForm" />

          </div> */}

          <Input
            label="E-mail"
            value={email}
            name={email}
            type="email"
            whenChanged={(value) => setEmail(value)}
          />
          <Input
            label="Senha"
            value={password}
            name={password}
            type="password"
            whenChanged={(value) => setPassword(value)}
          />

        </form>
        <Button nome="Login" />

      </section>
    </div>
  );
}

export default Home;
