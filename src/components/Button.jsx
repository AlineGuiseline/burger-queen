import React from 'react';
import styles from './Button.module.css';

  return (
    <div>
      {/* <button className={styles.btnEstilo} type="submit"
      onClick={props.onClick}>{props.name}</button> */}
      <button className={styles.btnEstilo} type="submit">{props.name}</button>
    </div>
  );
}
export default Button;
