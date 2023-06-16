import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../../../components/LogoutButton/LogoutButton';
import Button from '../../../components/Button/Button';
import AdminInfoBox from '../components/AdminInfoBox';
import EditButton from '../components/Buttons/EditButton/EditButton';
import DeleteButton from '../components/Buttons/DeleteButton/DeleteButton';

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
      <header>
        <LogoutButton />
        <Button onClick={handleBack}> Voltar </Button>
      </header>

      <main>
        <AdminInfoBox
          label="Nome completo"
          type="text"
        />
        <AdminInfoBox
          label="E-mail"
          type="email"
        />
        <EditButton />
        <DeleteButton />
      </main>
    </section>
  );
}

export default Employees;
