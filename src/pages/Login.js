import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import userService from "../services/UserService";
import Input from "../components/Input";
import Menu from "../components/Menu";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const refreshUser = useCallback(
    (userLogged = null) => {
      if (!userLogged) userLogged = sessionStorage.getItem("user");
      if (userLogged && userLogged.isAdmin) {
        history.push("/dashboard");
      } else if (userLogged && !userLogged.isAdmin) {
        history.push("/assembly");
      }
    },
    [history]
  );

  useEffect(() => refreshUser(), [refreshUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (username !== null && password !== null) {
      await userService.login(username.trim(), password);
      history.push("/assembly")
    }
  }

  return (
    <div>
      <Menu />
      <div
        className="container"
        style={{ paddingLeft: "10%", paddingRight: "10%" }}
      >
        <h3 className="text-center">Autenticação</h3>
        <form className="form-group" onSubmit={handleSubmit}>
          <Input
            label="Usuário"
            handleInput={setUsername}
            placeholder="Digite seu usuário..."
            value={username}
          />
          <Input
            label="Senha"
            handleInput={setPassword}
            placeholder="Digite sua senha..."
            type="password"
            value={password}
          />
          <button type="submit" className="btn btn-success btn-block">
            <i className="m-1 fa fa-sign-in" />
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
