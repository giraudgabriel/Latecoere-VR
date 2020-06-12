import React from "react";
import FormAssembly from "./components/FormAssembly";
import ListAssembly from "./components/ListAssembly";
import ListScore from "./components/ListScore";
import Menu from "./components/Menu";

const Dashboard = () => {
  const [selectedAssembly, setSelectedAssembly] = React.useState({
    id: "",
    name: "",
    pieces: []
  });

  const [lastAssemblyInserted, setLastAssemblyInserted] = React.useState();

  function handleNewAssembly(newAssembly) {
    setLastAssemblyInserted(newAssembly);
  }

  function handleCleanFormAssembly() {
    setSelectedAssembly({ id: "", name: "", pieces: [] });
  }

  return (
    <div>
      <Menu />
      <div className="row m-3">
        <div className="col card">
          <h3 className="text-center">Cadastro de Montagem</h3>
          <FormAssembly
            assembly={selectedAssembly}
            handleNewAssembly={handleNewAssembly}
            handleCleanFormAssembly={handleCleanFormAssembly}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ListAssembly
            lastAssemblyInserted={lastAssemblyInserted}
            setSelectedAssembly={setSelectedAssembly}
          />
        </div>
        <div className="col">
          <ListScore />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
