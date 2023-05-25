import { React, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Input from '../components/Input';
import Button from '../components/Button';
import userLogin from '../api/users';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const signIn = async (e) => {
  //   e.preventDefault();
  //   console.log('funcionou');
  //   await userLogin(email, password);
  // };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await userLogin(email, password);
      console.log(loggedUser);

      if (loggedUser.user.role === 'admin') {
        navigate('/menu');
      }
    } catch {
      console.log('Algo deu errado');
    }
  };

  return (
    <div className="bodyHome">
      <section className="container">
        <img alt="logo-imagem" src={Logo} className="logoImage" />

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

          <Button name="Login" />
        </form>

      </section>
    </div>
  );
}

export default Home;
