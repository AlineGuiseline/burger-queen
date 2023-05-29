import React from 'react';
import styles from './Input.module.css';
/*
export default function Input(props) {
  return (
    <div className="inputContainer">
      <label className={styles.labelForm}>{props.label}</label>
      <input
        className={styles.inputForm}
        type={props.type || 'text'}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        placeholder={props.placeholder}
      />
    </div>
  );
}
*/
function Input(props) {
  const whenTyped = (evento) => {
    props.whenChanged(evento.target.value);
  };

  return (
    <div className="inputContainer">
      <label className={styles.labelForm}>{props.label}</label>
      <input
        className={styles.inputForm}
        type={props.type || 'text'}
        value={props.value}
        onChange={whenTyped}
        name={props.name}
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default Input;
