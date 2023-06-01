import React from 'react';
import styles from './InfoBox.module.css';

// function InfoBox({
//   item, valor, cor,
// }) {
//   return (
//     <div style={{ backgroundColor: cor }} className={styles.quadrado}>
//       <div>
//         <p className={styles.nomeItem}>{item}</p>
//       </div>
//       <div>
//         <p className={styles.valor}>{valor}</p>
//       </div>
//     </div>
//   );
// }

function InfoBox(props) {
  return (
    <li className={styles.quadrado}>
      <p className={styles.nomeItem}>{props.item}</p>
      <p className={styles.valor}>{props.valor}</p>
      <button className={styles.button} type="submit" onClick={props.onClick}>+</button>
    </li>
  );
}

export default InfoBox;
