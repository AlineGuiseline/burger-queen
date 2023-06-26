/* eslint-disable max-len */
import { React, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfoBox from '../../components/InfoBox/InfoBox';
import InfoBoxTitle from '../../components/InfoBoxTitle/InfoBoxTitle';
import Logo from '../../assets/logo.png';
import Input from '../../components/Input/Input';
import { getProducts } from '../../api/products';
import ItemOrder from '../../components/ItemOrder/ItemOrder';
import { createOrder } from '../../api/orders';
import { getLocalStorageItem } from '../../storage/localStorage';

import './Menu.css';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import CheckIcon from './CheckIcon/CheckIcon';

function Menu() {
  const [products, setProducts] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [showProducts, setShowProducts] = useState(false);
  const [clientName, setName] = useState('');
  // criar estado para armazenar produtos filtrados CHECK
  // função que recebe como parâmetro o tipo de produto -- faz o filtro CHECK
  // adicionar o onClick com a função da filtragem CHECK
  // faz o map nos produtos selecionados CHECK

  useEffect(() => {
    async function fetchData() {
      const token = getLocalStorageItem('token');
      const response = await getProducts(token);
      const listaProdutos = await response.json();
      setProducts(listaProdutos);
    }
    fetchData();
  }, []);

  const filteredCategory = (categoria) => {
    setFilterCategory(categoria);
    setShowProducts(true);
  };

  const filteredProducts = filterCategory
    ? products.filter((product) => product.type === filterCategory)
    : products;

  const quantityControl = (item, children) => {
    // item: objeto que contém informações sobre um item do pedido, como seu ID e quantidade.
    // children: valor que indica se a quantidade do item será incrementada ou decrementada.
    const getIndex = orderItem.findIndex((order) => order.id === item.id);
    // localiza o índice do array, procurando um objeto de pedido com um ID correspondente ao ID do item fornecido.
    const newOrder = [...orderItem];
    // cria uma cópia do array orderItem e a armazena na variável newOrder.

    if (children === '-') {
      if (item.quantity <= 1) {
        // Se for menor ou igual a 1, isso significa que o item deve ser removido do pedido.
        newOrder.splice(getIndex, 1);
        // O método splice remove o item do array newOrder no índice encontrado.
        setOrderItem(newOrder);
        // Em seguida, o estado orderItem é atualizado com o novo array newOrder usando o método setOrderItem.
      } else {
        const specificItem = newOrder[getIndex];
        // pega o item específico do array newOrder usando o índice encontrado antes e o armazena na variável specificItem.
        const valueChange = specificItem.quantity - 1;
        // calcula o novo valor da quantidade, que é a quantidade atual menos 1.
        newOrder[getIndex].quantity = valueChange;
        // atualiza a propriedade quantity do objeto specificItem com o novo valor.
        setOrderItem(newOrder);
        // atualiza o estado orderItem com o novo array newOrder.
      }
    }

    if (children === '+') {
      const specificItem = newOrder[getIndex];
      const quantityChange = specificItem.quantity + 1;
      newOrder[getIndex].quantity = quantityChange;
      setOrderItem(newOrder);
    }
  };

  function addItem(item) {
    // verificar se getIndex existe => quantity + 1
    // se não existe iniciar com 1
    const getIndex = orderItem.findIndex((order) => order.id === item.id);
    const newOrder = [...orderItem];
    // O método findIndex() retorna -1 quando o elemento não é encontrado no array, e 0 ou um valor positivo quando
    // o elemento é encontrado. No JavaScript, 0 é considerado um valor falso em um contexto booleano.
    // Portanto, a condição if (getIndex) irá falhar quando getIndex for igual a 0, resultando em um comportamento
    // incorreto. Para corrigir isso, você deve verificar explicitamente se getIndex é maior ou igual a 0:
    if (getIndex >= 0) {
      const specificItem = newOrder[getIndex];
      const quantityChange = specificItem.quantity + 1;
      newOrder[getIndex].quantity = quantityChange;
      setOrderItem(newOrder);
    } else {
      const product = { ...item, quantity: 1 };
      setOrderItem([...newOrder, product]);
    }
  }

  const newOrder = async () => {
    try {
      const token = getLocalStorageItem('token');
      const waiterId = getLocalStorageItem('userId');
      const orderId = getLocalStorageItem('id');

      if (clientName === '') {
        throw new Error('Por favor, insira o nome do cliente');
      }
      if (orderItem.length <= 0) {
        throw new Error('Por favor, insira ao menos 1 item ao pedido');
      }
      const response = await createOrder(orderId, orderItem, clientName, waiterId, token);
      const orderData = await response.json();
      console.log(orderData);

      if (response.status === 201) {
        toast.success('Pedido enviado à cozinha com sucesso!');
        setOrderItem([]);
        setName('');
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <section className="bodyMenu">
      <div className="imagensHeader">
        <LogoutButton />
        <img className="logoMenu" src={Logo} alt="logoBurguerQueen" />
      </div>
      <div className="mainMenu">
        <div className="btnProntos">
          <CheckIcon />
        </div>
        <div className="options">
          <InfoBoxTitle item="Café da manhã" onClick={() => filteredCategory('Café da manhã')} />
          <InfoBoxTitle item="Almoço" onClick={() => filteredCategory('Almoço')} />
          <InfoBoxTitle item="Bebidas" onClick={() => filteredCategory('Bebidas')} />
          <InfoBoxTitle item="Sobremesas" onClick={() => filteredCategory('Sobremesas')} />
        </div>

        <div className="products">
          {showProducts
          && filteredProducts.map((product) => (
            <InfoBox
              key={product.id}
              item={product.name}
              valor={product.price}
              onClick={() => addItem(product)}
            />
          ))}
          <ToastContainer
            autoClose={1500}
          />
        </div>
      </div>

      <div className="pedidosDesktop">
        <img className="logoMenuSegunda" src={Logo} alt="logoBurguerQueen" />
        <div className="pedidos">
          <div className="resumoPedido">
            <p className="resumo">Resumo do Pedido:</p>
            <Input
              value={clientName}
              whenChanged={(value) => setName(value)}
              name={clientName}
              placeholder="Nome do cliente"
            />
          </div>
          <ItemOrder
            orderItem={orderItem}
            onClickQuantity={quantityControl}
            onClick={newOrder}
          />
        </div>
      </div>
    </section>
  );
}

export default Menu;
