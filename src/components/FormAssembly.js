import React from "react";
import Assembly from "../models/Assembly";
import Piece from "../models/Piece";
import assemblyService from "../services/AssemblyService";
import Input from "./Input";
import FormPiece from "./FormPiece";

const FormAssembly = ({
  assembly,
  handleNewAssembly,
  handleCleanFormAssembly,
}) => {
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [pieces, setPieces] = React.useState([]);

  React.useEffect(() => {
    if (assembly !== undefined) {
      const { id, name, pieces } = assembly;
      setId(id);
      setName(name);
      setPieces(pieces);
    }
  }, [assembly]);

  function limparForm(e) {
    setId("");
    setName("");
    setPieces([]);
    handleCleanFormAssembly();
  }

  async function handleSubmit(e) {
    if (name !== "" && pieces.length > 0) {
      const response =
        assembly.id !== ""
          ? await assemblyService.patch(new Assembly(pieces, name, assembly.id))
          : await assemblyService.add(new Assembly(pieces, name));
      if (response.status === 201 || response.status === 200) {
        if (response.data) {
          handleNewAssembly(response.data);
          window.location.reload();
        }
        alert("Montagem salva com sucesso!");
      } else {
        alert("Algum erro ocorreu!");
      }
    } else {
      alert("Preencha os campos vazios!");
    }
  }

  async function handleDelete(e) {
    if (assembly && window.confirm("Deseja realmente excluir?")) {
      const response = await assemblyService.delete(assembly.id);
      if (response.status === 200) {
        alert("Montagem excluída com sucesso!");
        window.location.reload();
      } else {
        alert("Algum erro ocorreu!");
      }
    }
  }

  function handleNewPiece(e) {
    e.preventDefault();
    setPieces([...pieces, new Piece(pieces.length + 1, "", "", "")]);
  }

  function handleChangePiece(piece, index) {
    let newArr = [...pieces];
    newArr[index] = piece;
    setPieces(newArr);
  }

  function handleDeletePiece(e, piece) {
    e.preventDefault();
    if (window.confirm("Deseja realmente excluir esta peça?")) {
      let oldIndex = 0;
      let newArray = pieces.filter((p, index) => {
        if (p.id === piece.id) {
          oldIndex = index;
        }
        return p.id !== piece.id;
      });
      for (let index = oldIndex; index < newArray.length; index++) {
        const pieceToDecreaseId = newArray[index];
        pieceToDecreaseId.id -= 1;
      }
      setPieces(newArray);
    }
  }

  function renderPieces() {
    if (pieces.length > 0) {
      return pieces.map((piece, index) => {
        return (
          <FormPiece
            key={piece.id}
            piece={piece}
            handleChangePiece={(newPiece) => handleChangePiece(newPiece, index)}
            handleDelete={(e) => handleDeletePiece(e, piece)}
          />
        );
      });
    } else {
      return (
        <tr className="alert alert-warning">
          <td colSpan="8" className="text-center">
            Nenhuma peça inserida ainda
          </td>
        </tr>
      );
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h1>
          Cadastro de Montagem
          <button onClick={limparForm} className="btn btn-sm btn-success ml-3">
            <i className="fa fa-plus"></i>
            Nova Montagem
          </button>
        </h1>
      </div>

      <div className="form-group m-3">
        <Input
          label="ID"
          placeholder="Identificador da peça"
          hidden={assembly.id === 0 || assembly.id === null}
          disabled
          value={id}
          handleInput={setId}
        />
        <Input
          label="Nome"
          placeholder="Nome da montagem"
          value={name}
          handleInput={setName}
        />

        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Nome</th>
              <th>GLTF</th>
              <th>IMAGEM</th>
              <th>POSIÇÃO X</th>
              <th>POSIÇÃO Y</th>
              <th>POSIÇÃO Z</th>
              <td>
                <button
                  onClick={handleNewPiece}
                  className="btn btn-success text-white"
                >
                  <i className="fa fa-plus"></i>
                </button>
              </td>
            </tr>
          </thead>
          <tbody>{renderPieces()}</tbody>
        </table>

        <button onClick={handleSubmit} className="btn btn-success btn-block">
          <i className="fa fa-save"></i>
        </button>
        <button
          onClick={handleDelete}
          hidden={assembly.id === "" || assembly.id === undefined}
          className="btn btn-danger btn-block"
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    </div>
  );
};

export default FormAssembly;
