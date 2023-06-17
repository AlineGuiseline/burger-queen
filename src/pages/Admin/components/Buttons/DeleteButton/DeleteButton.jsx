import React from 'react';
import styles from './DelteButton.module.css';

function DeleteButton() {
  const deleteInfo = () => {
    console.log('clicou no excluir');
  };

  return (
    <button className={styles.botao} type="submit" onClick={deleteInfo}> Excluir </button>
  );
}

export default DeleteButton;
