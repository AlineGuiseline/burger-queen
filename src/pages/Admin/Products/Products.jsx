import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLocalStorageItem } from '../../../storage/localStorage';
import {
  getProducts, editProduct, deleteProduct, createProduct,
} from '../../../api/products';
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
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productName, setProductName] = useState([]);
  const [productPrice, setProductPrice] = useState([]);
  const [productType, setProductType] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = getLocalStorageItem('token');
      const response = await getProducts(token);
      const listaDeProdutos = await response.json();
      setListStock(listaDeProdutos);
    }
    fetchData();
  }, []);

  const openModal = (products) => {
    setSelectedProduct(products);
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

  const changeProduct = async (products) => {
    try {
      const token = getLocalStorageItem('token');
      const response = await editProduct(token, products.id, products);
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

  const deleteAProduct = async (products) => {
    try {
      const token = getLocalStorageItem('token');
      console.log(products);
      const response = await deleteProduct(token, products.id);
      const editList = await response.json();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      toast.success('O produto foi deletado com sucesso!');
      console.log(editList);
    } catch (error) {
      throw error;
    }
  };

  const createNewProduct = async () => {
    try {
      const token = getLocalStorageItem('token');
      const productId = getLocalStorageItem('id');
      const response = await createProduct(
        token,
        productId,
        productName,
        productPrice,
        productType,
      );
      const editList = await response.json();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      toast.success('O produto foi criado com sucesso!');
      console.log(editList);
    } catch (error) {
      throw error;
    }
  };

  return (
    <section>
      <ToastContainer
        autoClose={2000}
      />
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
            value={productName}
            whenChanged={(value) => setProductName(value)}
            name={productName}
          />
          <AdminInfoBox
            label="Preço:"
            type="number"
            value={productPrice}
            whenChanged={(value) => setProductPrice(value)}
            name={productPrice}
          />
          <AdminInfoBox
            label="Tipo:"
            type="text"
            value={productType}
            whenChanged={(value) => setProductType(value)}
            name={productType}
          />
          <ButtonAdmin
            nome="Salvar"
            onClick={createNewProduct}
          />
        </div>
        {listStock.map((item) => (
          <div className="inputs" key={item.id}>
            <Paragraph>Nome: {item.name}</Paragraph>
            <Paragraph>Preço: ${item.price}</Paragraph>
            <Paragraph>Tipo: {item.type}</Paragraph>
            <div className="buttonsP">
              <ButtonAdmin
                nome="Editar"
                onClick={() => openModal(item)}
              />
              <ButtonAdmin
                nome="Excluir"
                onClick={() => deleteAProduct(item)}
              />
            </div>
          </div>
        ))}
      </main>
      <ReactModal
        isOpen={isModalOpen}
        style={customStyles}
      >
        {selectedProduct && (
        <>
          <AdminInfoBox
            label="Nome"
            type="text"
            value={selectedProduct.name || ''}
            whenChanged={(value) => setSelectedProduct((prevProduct) => ({
              ...prevProduct,
              name: value,
            }))}
          />
          <AdminInfoBox
            label="Preço"
            type="number"
            value={selectedProduct.price || ''}
            whenChanged={(value) => setSelectedProduct((prevProduct) => ({
              ...prevProduct,
              price: value,
            }))}
          />
          <AdminInfoBox
            label="Tipo"
            type="text"
            value={selectedProduct.type || ''}
            whenChanged={(value) => setSelectedProduct((prevProduct) => ({
              ...prevProduct,
              type: value,
            }))}
          />
        </>
        )}
        <div className="buttonsP">
          <ButtonAdmin
            nome="Salvar"
            onClick={() => changeProduct(selectedProduct)}
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
