import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import { usersList } from '../../../api/users';
import LogoutButton from '../../../components/LogoutButton/LogoutButton';
import Button from '../../../components/Button/Button';
import AdminInfoBox from '../components/AdminInfoBox/AdminInfoBox';
import Paragraph from '../../../components/Paragraph/Paragraph';
import ButtonAdmin from '../components/Button/ButtonAdmin';
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
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const token = getLocalStorageItem('token');
      const response = await usersList(token);
      const listaFuncionarios = await response.json();
      setListEmployees(listaFuncionarios);
    }
    fetchData();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const customStyles = {
    content: {
      borderRadius: '30px',
      border: '1px solid #358f84',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
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
            <div className="buttons">
              <ButtonAdmin
                nome="Editar"
                onClick={openModal}
              />
              <ButtonAdmin
                nome="Excluir"
              />
            </div>
          </div>
        ))}

      </main>
      <ReactModal
        isOpen={isModalOpen}
        style={customStyles}
      >
        <AdminInfoBox
          label="Nome Completo"
          type="text"
        />
        <AdminInfoBox
          label="Email"
          type="email"
        />
        <AdminInfoBox
          label="Função"
          type="text"
        />
        <div className="buttons">
          <ButtonAdmin
            nome="Salvar"
          />
          <ButtonAdmin
            nome="Fechar"
            onClick={closeModal}
          />
        </div>
      </ReactModal>
    </section>
  );
}

export default Employees;
