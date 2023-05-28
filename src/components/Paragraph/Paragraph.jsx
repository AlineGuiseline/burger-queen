import React from 'react';
import styles from './Paragraph.module.css';

function Paragraph({ text }) {
  return (
    <div>
      <p className={styles.texto}>{text}</p>
    </div>
  );
}

export default Paragraph;
