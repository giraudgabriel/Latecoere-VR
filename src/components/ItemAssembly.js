import React from "react";

const ItemAssembly = ({ assembly, handleSelected }) => {
  function renderItem() {
    return (
      <tr>
        <td>{assembly.id}</td>
        <td>{assembly.name}</td>
        <td>{assembly.pieces.length}</td>
        <td>
          <button
            onClick={() => handleSelected(assembly)}
            className="btn btn-primary btn-block"
          >
            <i className="fa fa-edit mr-1" />
            Alterar
          </button>
        </td>
      </tr>
    );
  }

  return renderItem();
};

export default ItemAssembly;
