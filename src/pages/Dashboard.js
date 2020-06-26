import React from "react";
import FormAssembly from "../components/FormAssembly";
import ListAssembly from "../components/ListAssembly";
import Menu from "../components/Menu";

const Dashboard = () => {
    const [selectedAssembly,
        setSelectedAssembly] = React.useState({id: "", name: "", pieces: []});

    const [lastAssemblyInserted,
        setLastAssemblyInserted] = React.useState();

    function handleNewAssembly(newAssembly) {
        setLastAssemblyInserted(newAssembly);
    }

    function handleCleanFormAssembly() {
        setSelectedAssembly({id: "", name: "", pieces: []});
    }

    return (
        <div>
            <Menu/>
            <div className="container">
                <div className="col">
                    <FormAssembly
                        assembly={selectedAssembly}
                        handleNewAssembly={handleNewAssembly}
                        handleCleanFormAssembly={handleCleanFormAssembly}/>
                </div>
                <div className="col mt-3">
                    <ListAssembly
                        lastAssemblyInserted={lastAssemblyInserted}
                        setSelectedAssembly={setSelectedAssembly}/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
