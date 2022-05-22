import React from "react";

const ItemAssembly = ({ assembly, handleSelected }) => {
  const renderItem = React.useMemo(() => {
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
            <i className="m-1 fa fa-edit" />
            Alterar
          </button>
        </td> 
      </tr>
    );
  }, [assembly, handleSelected]);

  return renderItem;
};

export default ItemAssembly;
