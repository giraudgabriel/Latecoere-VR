import React from 'react';
import Input from './Input';
import Piece from '../models/Piece'

const FormPiece = ({piece, handleChangePiece, handleDelete}) => {
    const [name,
        setName] = React.useState(piece.name);
    const [src,
        setSrc] = React.useState(piece.src);
    const [src_img,
        setSrcImg] = React.useState(piece.src_img);

    React.useEffect(() => {
        if (piece.src !== src || piece.src_img !== src_img || piece.name !== name) {
            handleChangePiece(new Piece(piece.id, src, src_img, name))
        }
    }, [
        name,
        src,
        src_img,
        handleChangePiece,
        piece.id,
        piece.name,
        piece.src_img,
        piece.src
    ])

    return <tr>
        <td>{piece.id}</td>
        <td><Input placeholder="Nome da peça" value={piece.name} handleInput={setName}/>
        </td>
        <td><Input placeholder="gltf.com/gltf.gltf" value={piece.src} handleInput={setSrc}/>
        </td>
        <td><Input
            placeholder="image.com/img.png"
            value={piece.src_img}
            handleInput={setSrcImg}/>
        </td>
        <td>
            <button onClick={(e) => handleDelete(e)} className="btn btn-danger btn-block">
                <i className="fa fa-trash"/>
            </button>
        </td>
    </tr>

}
export default FormPiece;