import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../../../components/LogoutButton/LogoutButton';
import Button from '../../../components/Button/Button';
import AdminInfoBox from '../components/AdminInfoBox';
import EditButton from '../components/Buttons/EditButton/EditButton';
import DeleteButton from '../components/Buttons/DeleteButton/DeleteButton';
import Logo from '../../../assets/logo.png';
import './Employees.css';

function Employees() {
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
      <header className="headerE">
        <LogoutButton />
        <img className="logoEmployees" src={Logo} alt="logo burger queen" />
      </header>
      <div className="btnVoltarE">
        <Button onClick={handleBack}> Voltar </Button>
      </div>
      <main className="mainEmployees">
        <div className="inputsE">
          <AdminInfoBox
            label="Nome completo:"
            type="text"
          />
          <AdminInfoBox
            label="E-mail:"
            type="email"
          />
          <AdminInfoBox
            label="Função:"
            type="text"
          />
          <div className="buttons">
            <EditButton />
            <DeleteButton />
          </div>
        </div>
      </main>
    </section>
  );
}

export default Employees;
