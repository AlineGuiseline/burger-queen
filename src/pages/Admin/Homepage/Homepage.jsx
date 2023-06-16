import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo.png';
import LogoutButton from '../../../components/LogoutButton/LogoutButton';
import InfoBoxTitle from '../../../components/InfoBoxTitle/InfoBoxTitle';

function Homepage() {
  const navigate = useNavigate();

  const productsPage = () => {
    try {
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  };

  const employeesPage = () => {
    try {
      navigate('/employees');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <header>
        <LogoutButton />
        <img src={Logo} alt="logoBurguerQueen" />
      </header>

      <main>
        <InfoBoxTitle onClick={productsPage} item="Produtos" />
        <InfoBoxTitle onClick={employeesPage} item="Funcionários" />
      </main>

    </section>
  );
}

export default Homepage;
