import React, { Component } from "react";
import Menu from "../components/Menu";
import assemblyService from "../services/AssemblyService";
class Assembly extends Component {
  state = {
    assemblies: [],
  };
  async getAssemblies() {
    await assemblyService.getAll().then((response) => {
      const assemblies = response.data;
      this.setState({
        ...this.state,
        assemblies,
      });
    });
  }

  async componentDidMount() {
    await this.getAssemblies();
  }

  handleJoinVR(assembly) {
    sessionStorage.setItem("assembly", JSON.stringify(assembly));
    window.location.href = "/vr";
  }
  renderAssemblies() {
    if (this.state.assemblies.length > 0) {
      return this.state.assemblies.map((assembly) => (
        <div key={assembly.id} className="col-lg-3">
          <div className="card m-3">
            <div className="card-body">
              <h5 className="card-title">{assembly.name}</h5>
              <button
                onClick={() => this.handleJoinVR(assembly)}
                className="btn btn-primary btn-block"
              >
                <i className="m-1 fa fa-eye" />
                Entrar no VR
              </button>
            </div>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="alert alert-warning m-5">
          Nenhuma montagem encontrada
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Menu />
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h1 className="mb-5">Lista de Montagens</h1>
            </div>
            <div className="row">{this.renderAssemblies()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Assembly;
