import React from 'react';
import styles from './AdminInfoBox.module.css';

function AdminInfoBox(props) {
  const whenTyped = (evento) => {
    props.whenChanged(evento.target.value);
  };

  return (
    <section className={styles.container}>
      <div>
        <label>{props.label}</label>
        <input
          className={styles.inputInfo}
          type={props.type}
          value={props.value}
          onChange={whenTyped}
          name={props.name}
        />
      </div>
    </section>
  );
}

export default AdminInfoBox;
