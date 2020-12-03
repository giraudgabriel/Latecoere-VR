import React, { Component } from "react";
import Menu from "../components/Menu";
import UserService from "../services/UserService";

class Users extends Component {
  state = {
    users: [],
  };

  async getUsers() {
    await UserService.getAll().then((response) => {
      this.setState({
        ...this.state,
        users: response.data,
      });
    });
  }

  async updateUser(e, user) {
    e.preventDefault();
    let userChanged = user;
    userChanged.admin = !userChanged.admin;
    let users = [
      ...this.state.users.filter((u) => u.username !== user.username),
      userChanged,
    ];
    await UserService.put(userChanged);
    this.setState({
      ...this.state,
      users,
    });
  }
  async deleteUser(user) {
    if (user) {
      if (
        window.confirm(`Deseja realmente excluir o usuário ${user.username}`)
      ) {
        await UserService.delete(user._id);
        const users = this.state.users.filter((u) => u._id !== user._id);
        this.setState({
          ...this.state,
          users,
        });
      }
    }
  }
  componentDidMount() {
    this.getUsers();
  }

  renderUsers() {
    if (this.state.users.length === 0) {
      return (
        <tr className="alert alert-warning">
          <td colSpan="7" className="text-center">
            Nenhum usuário encontrado
          </td>
        </tr>
      );
    } else {
      return this.state.users.map((user) => (
        <tr key={user._id.timestamp} className="text-left">
          <td>{user.username}</td>
          <td>{user.name}</td>
          <td>
            <button
              className={
                user.admin ? "btn btn-success btn-sm " : "btn btn-danger btn-sm"
              }
              onClick={async (e) => await this.updateUser(e, user)}
            >
              <i
                className={
                  user.admin ? "fa fa-check-circle" : "fa fa-times-circle"
                }
              />
            </button>
          </td>
          <td>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => this.deleteUser(user)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      ));
    }
  }

  render() {
    return (
      <div>
        <Menu />
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h1>Lista de Usuários</h1>
            </div>
            <table className="table table-borderless table-hover">
              <thead>
                <tr className="text-left">
                  <th>Usuário</th>
                  <th>Nome</th>
                  <th>Administrador</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{this.renderUsers()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
