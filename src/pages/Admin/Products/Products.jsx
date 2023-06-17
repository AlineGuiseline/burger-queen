import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../../../components/LogoutButton/LogoutButton';
import Button from '../../../components/Button/Button';
import AdminInfoBox from '../components/AdminInfoBox';
import EditButton from '../components/Buttons/EditButton/EditButton';
import DeleteButton from '../components/Buttons/DeleteButton/DeleteButton';
import Logo from '../../../assets/logo.png';
import './Products.css';

function Products() {
  const navigate = useNavigate();

  const handleBack = () => {
    try {
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <header className="headerP">
        <LogoutButton />
        <img className="logoProducts" src={Logo} alt="logo burguer queen" />
      </header>
      <div className="btnVoltar">
        <Button onClick={handleBack}> Voltar </Button>
      </div>
      <main className="mainProducts">
        <div className="inputs">
          <AdminInfoBox
            label="Nome do produto"
            type="text"
          />
          <AdminInfoBox
            label="Quantidade"
            type="number"
          />
          <div className="buttonsP">
            <EditButton />
            <DeleteButton />
          </div>
        </div>
      </main>

    </section>
  );
}

export default Products;
