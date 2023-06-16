import React from 'react';

function DeleteButton() {
  const deleteInfo = () => {
    console.log('clicou no excluir');
  };

  return (
    <button type="submit" onClick={deleteInfo}> Excluir </button>
  );
}

export default DeleteButton;
