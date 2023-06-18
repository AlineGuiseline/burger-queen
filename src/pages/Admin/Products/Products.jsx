import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorageItem } from '../../../storage/localStorage';
import getStock from '../../../api/stock';
import LogoutButton from '../../../components/LogoutButton/LogoutButton';
import Button from '../../../components/Button/Button';
import AdminInfoBox from '../components/AdminInfoBox';
import Paragraph from '../../../components/Paragraph/Paragraph';
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

  const [listStock, setListStock] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = getLocalStorageItem('token');
      const response = await getStock(token);
      const listaDeProdutos = await response.json();
      setListStock(listaDeProdutos);
    }
    fetchData();
  }, []);

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
        <div className="inputsE">
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
              <EditButton />
              <DeleteButton />
            </div>
          </div>
        ))}
        {/* <AdminInfoBox
            label="Nome do produto"
            type="text"
          />
          <AdminInfoBox
            label="Quantidade"
            type="number"
          /> */}

      </main>

    </section>
  );
}

export default Products;
