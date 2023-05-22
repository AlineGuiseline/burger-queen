import React from 'react';
import styles from './Input.module.css';

export default function Input(props) {
  const whenTyped = (e) => {
    props.whenChanged(e.target.value);
  };

  return (
    <div className="inputContainer">
      <label className={styles.labelForm}>{props.label}</label>
      <input
        className={styles.inputForm}
        type={props.type || 'text'}
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        onChange={whenTyped}
      />
    </div>
  );
}
