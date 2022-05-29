import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../services/UserService";
import Input from "../components/Input";
import Menu from "../components/Menu";
import User from "../models/User";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const refreshUser = () => {
    const userLogged = sessionStorage.getItem("user");
    if (userLogged && userLogged.isAdmin) {
      history.push("/dashboard");
    } else if (userLogged && !userLogged.isAdmin) {
      history.push("/assembly");
    }
  }

  useEffect(refreshUser, [history]);

  function validateUser() {
    if (username === null || username === undefined || username.length === 0)
      return false;
    if (name === null || name === undefined || name.length === 0) return false;
    if (password === null || password === undefined || password.length === 0)
      return false;
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validateUser()) {
      await userService.add(new User(username.trim(), name.trim(), password));
      await userService.login(username.trim(), password);
      refreshUser();
      toast.success("Usuário criado com sucesso!");
    } else {
      toast.warn("Preencha os campos vazios!");
    }
  }

  return (
    <div>
      <Menu />
      <div
        className="container"
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <h3 className="text-center">Cadastrar-se</h3>
        <form className="form-group" onSubmit={handleSubmit}>
          <Input
            label="Usuário"
            handleInput={setUsername}
            placeholder="Digite um usuário..."
            value={username}
          />
          <Input
            label="Nome"
            handleInput={setName}
            placeholder="Digite seu nome..."
            value={name}
          />
          <Input
            label="Senha"
            handleInput={setPassword}
            placeholder="Digite sua senha..."
            type="password"
            value={password}
          />
          <button type="submit" className="btn btn-success btn-block">
            <i className="m-1 fa fa-user-plus" />
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
