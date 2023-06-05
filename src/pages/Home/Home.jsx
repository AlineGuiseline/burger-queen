import { React, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import userLogin from '../../api/users';
import Paragraph from '../../components/Paragraph/Paragraph';
import Error from '../../Errors/Errors';
import { setItem } from '../../storage/localStorage';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [erro, setErro] = useState(null);

  const signIn = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const loggedUser = await userLogin(email, password);
      console.log(password);
      setItem('token', loggedUser.accessToken);

      if (loggedUser.user.role === 'admin') {
        navigate('/menu');
      }
      if (loggedUser.user.role === 'chef') {
        navigate('/kitchen');
      }
    } catch (error) {
      console.log(error);
      setErro(Error(error.message));
    }
  };

  return (
    <div className="bodyHome">
      <section className="container">
        <img alt="logo-imagem" src={Logo} className="logoImage" />
        <form className="form" onSubmit={signIn}>
          <Input
            label="E-mail"
            type="email"
            value={email}
            whenChanged={(value) => setEmail(value)}
            name={email}
            placeholder="email@exemplo.com"
          />
          <Input
            label="Senha"
            type="password"
            value={password}
            whenChanged={(value) => setPassword(value)}
            name={password}
            placeholder="●●●●●●"
          />
          <Paragraph
            text={erro && <Error message={erro} />}
          />
          <Button> Entrar </Button>
        </form>
      </section>
    </div>
  );
}

export default Home;
