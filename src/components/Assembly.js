import React, {Component} from 'react'
import Menu from './Menu'
import assemblyService from '../services/AssemblyService'
class Assembly extends Component {
    state = {
        assemblies: []
    };
    async getAssemblies() {
        await assemblyService
            .getAll()
            .then(response => {
                const assemblies = response.data;
                this.setState({
                    ...this.state,
                    assemblies
                });
            });
    }

    async componentDidMount() {
        await this.getAssemblies();
    }

    handleJoinVR(assemblie) {
        sessionStorage.setItem('assemblie', JSON.stringify(assemblie));
        window.location.href="/vr";
    }
    renderAssemblies() {
        return this
            .state
            .assemblies
            .map(assemblie => (
                <div key={assemblie.id} className="col-lg-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{assemblie.name}</h5>
                            <button
                                onClick={() => this.handleJoinVR(assemblie)}
                                className="btn btn-primary btn-block">
                                <i className="fa fa-eye"/>
                                Entrar no VR
                            </button>
                        </div>
                    </div>
                </div>
            ))
    }

    render() {
        return (
            <div>
                <Menu/>
                <div className="m-5">
                    <h1 className="mb-5">Lista de Montagens</h1>
                    <div className="row">
                        {this.renderAssemblies()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Assembly;
