import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckIcon.module.css';
import burgerIcon from '../../../assets/burgerIcon.png';
import Paragraph from '../../../components/Paragraph/Paragraph';

function iconCheck() {
  const navigate = useNavigate();

  const redirectReadyOrders = () => {
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
        onClick={redirectReadyOrders}
        className={styles.check}
      >
        <Paragraph>Pedidos prontos</Paragraph><img className={styles.icon} src={burgerIcon} alt="ícone-check" />
      </button>
    </div>
  );
}

export default iconCheck;
