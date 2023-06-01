import React from 'react';
import styles from './ItemOrder.module.css';

function ItemOrder(props) {
  return (
    <div className={styles.container}>
      <p>{props.children}</p>
      <div className={styles.icones}>
        <button type="submit" className={styles.adicionar}>+</button>
        <button type="submit" className={styles.retirar}>-</button>
      </div>
    </div>
  );
}

export default ItemOrder;
