import React from 'react';
import styles from './ItemOrder.module.css';

function ItemOrder(props) {
  return (
    <section>
      <ul className={styles.lista}>
        {props.orderItem.map((item) => (
          <li className={styles.product} key={item.id}>
            <p className={styles.name}>{item.name}</p>
            <p>
              {`$${item.price * item.quantity}`}
            </p>
            <div className={styles.add}>
              <button className={styles.miniButton} onClick={() => props.onClickQuantity(item, '-')} type="submit">-</button>
              <p>{item.quantity}</p>
              <button className={styles.miniButton} onClick={() => props.onClickQuantity(item, '+')} type="submit">+</button>
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.total}>
        $
        {props.orderItem.reduce((acumulador, valorAtual) => {
          return acumulador + (valorAtual.price * valorAtual.quantity);
        }, 0)}
      </p>
      <button type="submit" onClick={() => props.onClick()}>Enviar para a Cozinha</button>
    </section>
  );
}

export default ItemOrder;
