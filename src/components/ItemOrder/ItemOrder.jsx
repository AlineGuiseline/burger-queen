import React from 'react';
import styles from './ItemOrder.module.css';

function ItemOrder(props) {
  return (
    <div className={styles.container}>
      <p>{props.item}</p>
      <p>{props.price}</p>
      <p>{props.number}</p>
      <div className={styles.icones}>
        <button type="submit" className={styles.adicionar}>+</button>
        <button type="submit" className={styles.retirar}>-</button>
      </div>
    </div>
  );
}

export default ItemOrder;
