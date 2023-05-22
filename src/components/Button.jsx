import React from 'react';
import styles from './Button.module.css';

function Button({ nome }) {
  return (
    <div>
      <button className={styles.btnEstilo} type="submit">{nome}</button>
    </div>
  );
}
export default Button;
