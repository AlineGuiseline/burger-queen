import React from 'react';
import styles from './Paragraph.module.css';

function Paragraph({ children }) {
  return (
    <p className={styles.texto}>{children}</p>
  );
}

export default Paragraph;
