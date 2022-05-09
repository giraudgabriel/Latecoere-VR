import React from "react";
import assemblyService from "../services/AssemblyService";
import ItemAssembly from "./ItemAssembly";

const ListAssembly = ({ setSelectedAssembly }) => {
  const [assemblies, setAssemblies] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await assemblyService.getAll();
        setAssemblies(data);
      } catch (error) {
        fetch("../db.json").then((response) => {
          response.json().then((data) => {
            const { assembly } = data;
            setAssemblies(assembly);
          });
        });
      }
    }
    fetchData();
  }, []);

  function renderAssemblies() {
    if (assemblies.length > 0) {
      return assemblies.map((assembly) => (
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
    <div className="card">
      <div className="card-header">
        <h1>Lista de Montagens</h1>
      </div>
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
