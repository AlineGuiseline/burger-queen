import React from 'react';
import styles from './Quadrado.module.css';


function Quadrado({ item, valor }) {
  return (
    <div className={styles.quadrado}>
      <div>
        <p className={styles.nomeItem}>{item}</p>
      </div>
      <div>
        <p className={styles.valor}>{valor}</p>

      </div>
    </div>
  );
}

export default Quadrado;
