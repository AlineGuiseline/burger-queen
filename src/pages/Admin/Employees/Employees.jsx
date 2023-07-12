import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  usersList, editUser, deleteUser, createUser,
} from '../../../api/users';
import LogoutButton from '../../../components/LogoutButton/LogoutButton';
import Button from '../../../components/Button/Button';
import AdminInfoBox from '../components/AdminInfoBox/AdminInfoBox';
import Paragraph from '../../../components/Paragraph/Paragraph';
import ButtonAdmin from '../components/Button/ButtonAdmin';
import Logo from '../../../assets/logo.png';
import styles from './Employees.module.css';
import { getLocalStorageItem } from '../../../utils/localStorage';

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
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePassword, setEmployeePassword] = useState('');
  const [employeeRole, setEmployeeRole] = useState('');

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
      }, 1500);
      toast.success('As informações foram atualizadas!');
    } catch (error) {
      throw error;
    }
  };

  const deleteEmployee = async (users) => {
    try {
      const token = getLocalStorageItem('token');
      const response = await deleteUser(token, users.id);
      const editList = await response.json();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      toast.success('O funcionário foi deletado com sucesso!');
    } catch (error) {
      throw error;
    }
  };

  const createEmployee = async () => {
    try {
      const token = getLocalStorageItem('token');
      const userId = getLocalStorageItem('id');

      if (employeeName === '' || employeeEmail === '' || employeePassword === '' || employeeRole === '') {
        alert('Por favor, insira todas as informações do novo funcionário');
      }

      const response = await createUser(
        token,
        userId,
        employeeName,
        employeeEmail,
        employeePassword,
        employeeRole,
      );
      const editList = await response.json();

      if (response.status === 201) {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        toast.success('O funcionário foi criado com sucesso!');
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <section>
      <header className={styles.header}>
        <ToastContainer
          autoClose={1500}
        />
        <LogoutButton />
        <img className={styles.logoEmployees} src={Logo} alt="logo burger queen" />
      </header>
      <div className={styles.buttonBack}>
        <Button onClick={handleBack}> Voltar </Button>
      </div>
      <main className={styles.mainEmployees}>
        <div className={styles.inputs}>
          <Paragraph>ADICIONAR NOVO</Paragraph>
          <AdminInfoBox
            label="Nome:"
            type="text"
            value={employeeName}
            whenChanged={(value) => setEmployeeName(value)}
            name={employeeName}
          />
          <AdminInfoBox
            label="Email:"
            type="email"
            value={employeeEmail}
            whenChanged={(value) => setEmployeeEmail(value)}
            name={employeeEmail}
          />
          <AdminInfoBox
            label="Senha:"
            type="text"
            value={employeePassword}
            whenChanged={(value) => setEmployeePassword(value)}
            name={employeePassword}
          />
          <AdminInfoBox
            label="Função:"
            type="text"
            value={employeeRole}
            whenChanged={(value) => setEmployeeRole(value)}
            name={employeeRole}
          />
          <div className={styles.buttons}>
            <ButtonAdmin
              nome="Salvar"
              onClick={createEmployee}
            />
          </div>
        </div>
        {listEmployees.map((item) => (
          <div className={styles.inputs} key={item.id}>
            <Paragraph>Nome: {item.name} </Paragraph>
            <Paragraph>E-mail: {item.email} </Paragraph>
            <Paragraph>Função: {item.role} </Paragraph>
            <div className={styles.buttons}>
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
        <div className={styles.buttons}>
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
