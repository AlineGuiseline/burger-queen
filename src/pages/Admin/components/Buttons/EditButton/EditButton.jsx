import React from 'react';
import styles from './EditButton.module.css';

function EditButton() {
  const editInfo = () => {
    console.log('clicou no editar');
  };

  return (
    <button className={styles.botao} type="submit" onClick={editInfo}> Editar </button>
  );
}

export default EditButton;
