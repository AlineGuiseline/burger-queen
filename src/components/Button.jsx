import React from 'react';
import styles from './Button.module.css';

function Button(props) {
  return (
    <div>
      <button type="submit" className={styles.btnEstilo}>{props.nome}</button>
    </div>
  );
}
export default Button;
