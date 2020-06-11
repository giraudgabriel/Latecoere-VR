import React from "react";

const ItemPiece = ({ piece, handleSelected }) => {
  function renderItem() {
    return (
      <tr>
        <td>{piece.id}</td>
        <td>
          <a className="btn btn-dark btn-block" href={piece.src}>
            <i className="fa fa-gear" />
            Visualizar GLTF
          </a>
        </td>
        <td>
          <a className="btn btn-warning btn-block" href={piece.src_img}>
            <i className="fa fa-image" />
            Visualizar
          </a>
        </td>
        <td>
          <button
            onClick={() => handleSelected(piece)}
            className="btn btn-primary btn-block"
          >
            <i className="fa fa-edit" />
            Alterar
          </button>
        </td>
      </tr>
    );
  }

  return renderItem();
};

export default ItemPiece;
