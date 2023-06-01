import React from 'react';
// import styles from './ItemOrder.module.css';

// function ItemOrder(props) {
//   return (
//     <div className={styles.container}>
//       <p>{props.item}</p>
//       <p>{props.price}</p>
//       <p>{props.number}</p>
//       <div className={styles.icones}>
//         <button type="submit" className={styles.adicionar}>+</button>
//         <button type="submit" className={styles.retirar}>-</button>
//       </div>
//     </div>
//   );
// }

function ItemOrder(props) {
  return (
    <section>
      <ul>
        {props.orderItem.map((item) => (
          <li>
            <h4>{item.name}</h4>
            <p>{item.price}</p>
            <button type="submit">-</button>
            <p>1</p>
            <button type="submit">+</button>
          </li>
        ))}
      </ul>

      <h3>Total: R$</h3>
    </section>
  );
}

export default ItemOrder;
