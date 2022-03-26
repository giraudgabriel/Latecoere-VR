import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import userService from "../services/UserService";
import Input from "../components/Input";
import Menu from "../components/Menu";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = sessionStorage.getItem("user");
  const history = useHistory();

  const goToRoutes = useCallback(
    (currentUser) => {
      if (currentUser && currentUser.isAdmin) {
        history.push("/dashboard");
      } else if (currentUser && !currentUser.isAdmin) {
        history.push("/assembly");
      }
    },
    [history]
  );

  useEffect(() => {
    goToRoutes(user);
  }, [goToRoutes, history, user]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (username !== null && password !== null) {
      const newUser = await userService.login(username.trim(), password);
      goToRoutes(newUser);
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
            <i className="fa fa-sign-in mr-1" />
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
