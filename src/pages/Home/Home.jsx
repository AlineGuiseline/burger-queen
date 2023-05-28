import { React, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import userLogin from '../../api/users';
import Paragraph from '../../components/Paragraph/Paragraph';
import Error from '../../Errors/Errors';

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
      console.log(loggedUser);

      if (loggedUser.user.role === 'admin') {
        navigate('/menu');
      }
    } catch (error) {
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
          <Paragraph
            text={erro && <Error message={erro} />}
          />
          <Button name="Login" />
        </form>
      </section>
    </div>
  );
}

export default Home;