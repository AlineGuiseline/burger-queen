import React from 'react';

function AdminInfoBox(props) {
  /*
      const whenTyped = (evento) => {
    props.whenChanged(evento.target.value);
  };
  */

  /*
  const editInfo = () => {
    console.log('clicou no editar');
  };

  const deleteInfo = () => {
    console.log('clicou no excluir');
  };
*/

  return (
    <section>
      <div>
        <label>{props.label}</label>
        <input
          // className={styles.inputForm}
          type={props.type}
          value={props.value}
          // onChange={whenTyped}
          name={props.name}
          disabled
        />

        {/* <button type="submit" onClick={editInfo}> Editar </button>
        <button type="submit" onClick={deleteInfo}> Excluir </button> */}
      </div>
    </section>
  );
}

export default AdminInfoBox;
