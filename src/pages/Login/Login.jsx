import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Logo from '../../assets/logo.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { userLogin } from '../../api/users';
import Paragraph from '../../components/Paragraph/Paragraph';
import { setLocalStorageItem } from '../../utils/localStorage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const signIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const loggedUser = await userLogin(email, password);
      setLocalStorageItem('token', loggedUser.accessToken);
      setLocalStorageItem('userId', loggedUser.user.id);
      setLocalStorageItem('userRole', loggedUser.user.role);

      if (loggedUser.user.role === 'waiter') {
        navigate('/menu');
      }
      if (loggedUser.user.role === 'chef') {
        navigate('/kitchen');
      }
      if (loggedUser.user.role === 'admin') {
        navigate('/homepage');
      }
      if (loggedUser.user.role !== 'admin' && loggedUser.user.role !== 'chef' && loggedUser.user.role !== 'waiter') {
        setError(`Usuário cadastrado como ${loggedUser.user.role}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.bodyHome}>
      <section className={styles.container}>
        <img alt="logo-imagem" src={Logo} className={styles.logoImage} />
        <form className={styles.form} onSubmit={signIn}>
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
          <Paragraph>
            {error}
          </Paragraph>
          <Button> Entrar </Button>
        </form>
      </section>
    </div>
  );
}

export default Login;
