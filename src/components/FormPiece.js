import React, { useState, useEffect } from "react";
import Input from "./Input";
import Piece from "../models/Piece";

const FormPiece = ({ piece, handleChangePiece, handleDelete }) => {
  const [name, setName] = useState(piece.name);
  const [src, setSrc] = useState(piece.src);
  const [src_img, setSrcImg] = useState(piece.src_img);
  const [positionX, setPositionX] = useState(piece.positionX);
  const [positionY, setPositionY] = useState(piece.positionY);
  const [positionZ, setPositionZ] = useState(piece.positionZ);

  useEffect(() => {
    if (
      piece.src !== src ||
      piece.src_img !== src_img ||
      piece.name !== name ||
      piece.positionX !== positionX ||
      piece.positionY !== positionY ||
      piece.positionZ !== positionZ
    ) {
      handleChangePiece(
        new Piece(piece.id, src, src_img, name, positionX, positionY, positionZ)
      );
    }
  }, [
    name,
    src,
    src_img,
    handleChangePiece,
    piece.id,
    piece.name,
    piece.src_img,
    piece.src,
    piece.positionX,
    piece.positionY,
    piece.positionZ,
    positionX,
    positionY,
    positionZ,
  ]);

  return (
    <tr>
      <td>{piece.id}</td>
      <td>
        <Input
          placeholder="Nome da peça"
          value={piece.name}
          handleInput={setName}
        />
      </td>
      <td>
        <Input
          placeholder="gltf.com/gltf.gltf"
          value={piece.src}
          handleInput={setSrc}
        />
      </td>
      <td>
        <Input
          placeholder="image.com/img.png"
          value={piece.src_img}
          handleInput={setSrcImg}
        />
      </td>
      <td>
        <Input
          placeholder="Position X"
          value={piece.positionX}
          handleInput={setPositionX}
        />
      </td>
      <td>
        <Input
          placeholder="Position Y"
          value={piece.positionY}
          handleInput={setPositionY}
        />
      </td>
      <td>
        <Input
          placeholder="Position Z"
          value={piece.positionZ}
          handleInput={setPositionZ}
        />
      </td>
      <td>
        <button
          onClick={(e) => handleDelete(e)}
          className="btn btn-danger btn-block"
        >
          <i className="fa fa-trash" />
        </button>
      </td>
    </tr>
  );
};
export default FormPiece;
