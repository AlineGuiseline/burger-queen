import { React, useState } from 'react';
import styles from './InfoBoxTitle.module.css';

function boxTitle(props) {
  const [corAtiva, setCorAtiva] = useState(false);

  const handleClick = () => {
    setCorAtiva(true);
    props.onClick();
  };

  const resetColor = () => {
    setCorAtiva(false);
  };

  const buttonStyle = corAtiva ? `${styles.titleName} ${styles.activeColor}` : styles.titleName;

  return (
    <div>
      <button
        type="submit"
        onClick={handleClick}
        className={buttonStyle}
        onBlur={resetColor}
      >
        {props.item}
      </button>
    </div>
  );
}

export default boxTitle;
