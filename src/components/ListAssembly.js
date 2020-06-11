import React from "react";
import assemblyService from "../services/AssemblyService";
import ItemAssembly from "./ItemAssembly";

const ListAssembly = ({ setSelectedAssembly, lastAssemblyInserted }) => {
  const [assemblies, setAssemblies] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await assemblyService.getAll();
        setAssemblies(data);
      } catch (error) {
        fetch("../db.json").then(response => {
          response.json().then(data => {
            const { assembly } = data;
            setAssemblies(assembly);
          });
        });
      }
    }
    fetchData();
    // if (lastAssemblyInserted) {
    //     setAssemblies([
    //         ...assemblies,
    //         lastAssemblyInserted
    //     ])
    // }
  }, []);

  function renderAssemblies() {
    if (assemblies.length > 0) {
      return assemblies.map(assembly => (
        <ItemAssembly
          key={assembly.id}
          assembly={assembly}
          handleSelected={setSelectedAssembly}
        />
      ));
    } else {
      return (
        <tr className="alert alert-warning">
          <td colSpan="4" className="text-center">
            Nenhuma montagem encontrada
          </td>
        </tr>
      );
    }
  }

  return (
    <div className="m-3">
      <h3 className="text-center">Lista de Montagens</h3>
      <table className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Nome</th>
            <th>Peças</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderAssemblies()}</tbody>
      </table>
    </div>
  );
};

export default ListAssembly;
