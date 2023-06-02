import React from 'react';
import styles from './ItemOrder.module.css';

function ItemOrder(props) {
  return (
    <section>
      <ul className={styles.lista}>
        {props.orderItem.map((item) => (

          <li className={styles.product}>
            <p>{item.name}</p>
            <p>
              $
              {item.price}
            </p>
            <div className={styles.add}>
              <button className={styles.miniButton} type="submit">-</button>
              <p>{item.number}</p>
              <button className={styles.miniButton} type="submit">+</button>
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.total}>Total: $</p>
    </section>
  );
}

export default ItemOrder;
