import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import { getLocalStorageItem } from '../../../storage/localStorage';
import getStock from '../../../api/stock';
import LogoutButton from '../../../components/LogoutButton/LogoutButton';
import Button from '../../../components/Button/Button';
import AdminInfoBox from '../components/AdminInfoBox/AdminInfoBox';
import Paragraph from '../../../components/Paragraph/Paragraph';
import ButtonAdmin from '../components/Button/ButtonAdmin';

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

  const [listStock, setListStock] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  // const [infoProduto, setInfoProduto] = useState({});

  useEffect(() => {
    async function fetchData() {
      const token = getLocalStorageItem('token');
      const response = await getStock(token);
      const listaDeProdutos = await response.json();
      setListStock(listaDeProdutos);
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
      <header className="headerP">
        <LogoutButton />
        <img className="logoProducts" src={Logo} alt="logo burguer queen" />
      </header>
      <div className="btnVoltar">
        <Button onClick={handleBack}> Voltar </Button>
      </div>
      <main className="mainProducts">
        <div className="inputs">
          <Paragraph>ADICIONAR NOVO</Paragraph>
          <AdminInfoBox
            label="Produto:"
            type="text"
          />
          <AdminInfoBox
            label="Quantidade:"
            type="number"
          />
        </div>
        {listStock.map((item) => (
          <div className="inputs">
            <Paragraph>{item.name}</Paragraph>
            <Paragraph>{item.quantity}</Paragraph>
            <div className="buttonsP">
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
          label="Nome do produto"
          type="text"
        />
        <AdminInfoBox
          label="Quantidade"
          type="number"
        />
        <div className="buttonsP">
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

export default Products;
