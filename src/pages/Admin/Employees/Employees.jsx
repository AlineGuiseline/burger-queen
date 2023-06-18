import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersList } from '../../../api/users';
import LogoutButton from '../../../components/LogoutButton/LogoutButton';
import Button from '../../../components/Button/Button';
import AdminInfoBox from '../components/AdminInfoBox';
import Paragraph from '../../../components/Paragraph/Paragraph';
import EditButton from '../components/Buttons/EditButton/EditButton';
import DeleteButton from '../components/Buttons/DeleteButton/DeleteButton';
import Logo from '../../../assets/logo.png';
import './Employees.css';
import { getLocalStorageItem } from '../../../storage/localStorage';

function Employees() {
  const navigate = useNavigate();

  const handleBack = () => {
    try {
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const [listEmployees, setListEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = getLocalStorageItem('token');
      const response = await usersList(token);
      const listaFuncionarios = await response.json();
      setListEmployees(listaFuncionarios);
    }
    fetchData();
  }, []);

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
          <Paragraph>ADICIONAR NOVO</Paragraph>
          <AdminInfoBox
            label="Nome:"
            type="text"
          />
          <AdminInfoBox
            label="Email:"
            type="email"
          />
          <AdminInfoBox
            label="Função:"
            type="text"
          />
        </div>
        {listEmployees.map((item) => (
          <div className="inputsE">
            <Paragraph> {item.name} </Paragraph>
            <Paragraph> {item.email} </Paragraph>
            <Paragraph> {item.role} </Paragraph>
            {/* <AdminInfoBox
              label={item.name}
              type="text"
            />
            <AdminInfoBox
              label={item.email}
              type="email"
            />
            <AdminInfoBox
              label={item.role}
              type="text"
            /> */}
            <div className="buttons">
              <EditButton />
              <DeleteButton />
            </div>
          </div>
        ))}

      </main>
    </section>
  );
}

export default Employees;
