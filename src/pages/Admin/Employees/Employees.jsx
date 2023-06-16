import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../../../components/LogoutButton/LogoutButton';
import Button from '../../../components/Button/Button';

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
    <header>
      <LogoutButton />
      <Button onClick={handleBack}> Voltar </Button>
    </header>
  );
}

export default Employees;
