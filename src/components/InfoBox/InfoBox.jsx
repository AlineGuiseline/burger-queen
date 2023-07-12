import React from 'react';
import styles from './InfoBox.module.css';

function InfoBox(props) {
  return (
    <li className={styles.container}>
      <p className={styles.itemName}>{props.item}</p>
      <p className={styles.price}>
        $
        {props.valor}
      </p>
      <button className={styles.button} type="submit" onClick={props.onClick}>+</button>
    </li>
  );
}

export default InfoBox;
