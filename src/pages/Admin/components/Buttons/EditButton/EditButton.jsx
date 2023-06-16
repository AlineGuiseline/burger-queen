import React from 'react';

function EditButton() {
  const editInfo = () => {
    console.log('clicou no editar');
  };

  return (
    <button type="submit" onClick={editInfo}> Editar </button>
  );
}

export default EditButton;
