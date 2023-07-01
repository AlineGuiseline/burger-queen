import React from 'react';
import styles from './InfoBox.module.css';

function InfoBox(props) {
  return (
    <li className={styles.quadrado}>
      <p className={styles.nomeItem}>{props.item}</p>
      <p className={styles.valor}>
        $
        {props.valor}
      </p>
      <button className={styles.button} type="submit" onClick={props.onClick}>+</button>
    </li>
  );
}

export default InfoBox;
