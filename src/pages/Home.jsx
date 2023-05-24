import { React, useState } from 'react';
import './Home.css';
// import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Input from '../components/Input';
import Button from '../components/Button';
import userLogin from '../api/users';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (e) => {
    e.preventDefault();
    console.log('funcionou');
    await userLogin(email, password);
  };

  return (
    <div className="bodyHome">
      <section className="container">
        <img alt="logo-imagem" src={Logo} className="logoImage" />
        <form>
          <Input
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name={email}
            type="email"
            placeholder="email@exemplo.com"
          />
          <Input
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name={password}
            type="password"
            placeholder="●●●●●●"

          />
        </form>
        <Button name="Login" onClick={(e) => signIn(e)} />
      </section>
    </div>
  );
}

export default Home;
