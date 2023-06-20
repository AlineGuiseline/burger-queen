import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usersList, editUser, deleteUser } from '../../../api/users';
import LogoutButton from '../../../components/LogoutButton/LogoutButton';
import Button from '../../../components/Button/Button';
import AdminInfoBox from '../components/AdminInfoBox/AdminInfoBox';
import Paragraph from '../../../components/Paragraph/Paragraph';
import ButtonAdmin from '../components/Button/ButtonAdmin';
import Logo from '../../../assets/logo.png';
import './Employees.css';
import { getLocalStorageItem } from '../../../storage/localStorage';

ReactModal.setAppElement('#root');

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
  const [selectedEmployee, setSelectedEmployee] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = getLocalStorageItem('token');
      const response = await usersList(token);
      const listaFuncionarios = await response.json();
      setListEmployees(listaFuncionarios);
    }
    fetchData();
  }, []);

  const openModal = (employee) => {
    setSelectedEmployee(employee);
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

  const changeInfo = async (users) => {
    try {
      const token = getLocalStorageItem('token');
      const response = await editUser(token, users.id, users);
      const editList = await response.json();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      toast.success('As informações foram atualizadas!');
      console.log(editList);
    } catch (error) {
      throw error;
    }
  };

  const deleteEmployee = async (users) => {
    try {
      const token = getLocalStorageItem('token');
      console.log(users);
      const response = await deleteUser(token, users.id);
      const editList = await response.json();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      toast.success('O funcionário foi deletado com sucesso!');
      console.log(editList);
    } catch (error) {
      throw error;
    }
  };

  return (
    <section>
      <header className="headerE">
        <ToastContainer
          autoClose={2000}
        />
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
          <div className="inputsE" key={item.id}>
            <Paragraph> {item.name} </Paragraph>
            <Paragraph> {item.email} </Paragraph>
            <Paragraph> {item.role} </Paragraph>
            <div className="buttons">
              <ButtonAdmin
                nome="Editar"
                onClick={() => openModal(item)}
              />
              <ButtonAdmin
                nome="Excluir"
                onClick={() => deleteEmployee(item)}
              />
            </div>
          </div>
        ))}

      </main>
      <ReactModal
        isOpen={isModalOpen}
        style={customStyles}
        appElement={document.getElementById('root')}
      >
        {selectedEmployee && (
        <>
          <AdminInfoBox
            label="Nome Completo"
            type="text"
            value={selectedEmployee.name || ''}
            whenChanged={(value) => setSelectedEmployee((prevEmployee) => ({
              ...prevEmployee,
              name: value,
            }))}
          />
          <AdminInfoBox
            label="Email"
            type="email"
            value={selectedEmployee.email || ''}
            whenChanged={(value) => setSelectedEmployee((prevEmployee) => ({
              ...prevEmployee,
              email: value,
            }))}
          />
          <AdminInfoBox
            label="Função"
            type="text"
            value={selectedEmployee.role || ''}
            whenChanged={(value) => setSelectedEmployee((prevEmployee) => ({
              ...prevEmployee,
              role: value,
            }))}
          />
        </>
        )}
        <div className="buttons">
          <ButtonAdmin
            nome="Salvar"
            onClick={() => changeInfo(selectedEmployee)}
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
