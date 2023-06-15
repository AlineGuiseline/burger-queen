import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckIcon.module.css';
import burgerIcon from '../../../assets/burgerIcon.png';
import Paragraph from '../../../components/Paragraph/Paragraph';

function iconCheck() {
  const navigate = useNavigate();

  const orders = () => {
    try {
      navigate('/ready_orders');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        type="submit"
        onClick={orders}
        className={styles.check}
      >
        <Paragraph>Pedidos prontos</Paragraph><img className={styles.icone} src={burgerIcon} alt="ícone-check" />
      </button>
    </div>
  );
}

export default iconCheck;