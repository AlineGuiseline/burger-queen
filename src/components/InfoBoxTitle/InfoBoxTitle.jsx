import { React, useState } from 'react';
import styles from './InfoBoxTitle.module.css';

function QuadradoTitulo(props) {
  const [corAtiva, setCorAtiva] = useState(false);

  const handleClick = () => {
    setCorAtiva(true);
    props.onClick();
  };

  const resetarCor = () => {
    setCorAtiva(false);
  };

  const estiloBotao = corAtiva ? `${styles.nomeItemTitulo} ${styles.corAtiva}` : styles.nomeItemTitulo;

  return (
    <div>
      <button
        type="submit"
        onClick={handleClick}
        className={estiloBotao}
        onBlur={resetarCor}
      >
        {props.item}
      </button>
    </div>
  );
}

// function QuadradoTitulo(props) {
//   return (
//     <div>
//       <button
//         type="submit"
//         onClick={props.onClick}
//         className={styles.nomeItemTitulo}

//       >
//         {props.item}
//       </button>
//     </div>
//   );
// }

export default QuadradoTitulo;
