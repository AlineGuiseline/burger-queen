import React from 'react';
import styles from './Button.module.css';

function Button(props) {
  return (
    <div>
      <button className={styles.principalButton} type="submit" onClick={props.onClick}>{props.children}</button>
    </div>
  );
}

export default Button;
