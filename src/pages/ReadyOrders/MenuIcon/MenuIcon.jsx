import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MenuIcon.module.css';
import iconMenu from '../../../assets/iconMenu.png';
import Paragraph from '../../../components/Paragraph/Paragraph';

function MenuIcon() {
  const navigate = useNavigate();

  const orders = () => {
    try {
      navigate('/menu');
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
        <Paragraph>Cardápio</Paragraph><img className={styles.icone} src={iconMenu} alt="ícone-menu" />
      </button>
    </div>
  );
}

export default MenuIcon;
