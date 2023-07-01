import React from 'react';
import styles from './Paragraph.module.css';

function Paragraph({ children }) {
  return (
    <div>
      <p className={styles.texto}>{children}</p>
    </div>
  );
}

export default Paragraph;
