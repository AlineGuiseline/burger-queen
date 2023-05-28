import React from 'react';
import styles from './InfoBox.module.css';

function InfoBox({ item, valor, cor }) {
  return (
    <div style={{ backgroundColor: cor }} className={styles.quadrado}>
      <div>
        <p className={styles.nomeItem}>{item}</p>
      </div>
      <div>
        <p className={styles.valor}>{valor}</p>
      </div>
    </div>
  );
}

export default InfoBox;
