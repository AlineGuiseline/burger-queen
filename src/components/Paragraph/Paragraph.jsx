import React from 'react';
import styles from './Paragraph.module.css';

function Paragraph({ children }) {
  return (
    <p className={styles.text}>{children}</p>
  );
}

export default Paragraph;
