import React from 'react';
import styles from './ButtonAdmin.module.css';

function ButtonAdmin(props) {
  return (
    <button className={styles.botao} type="submit" onClick={props.onClick}> {props.nome} </button>
  );
}

export default ButtonAdmin;
