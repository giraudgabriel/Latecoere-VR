import React from "react";
import userService from "../services/UserService";
import { useHistory } from "react-router-dom";
const Menu = () => {
  const [user, setUser] = React.useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const history = useHistory();

  React.useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  function handleLogout() {
    if (window.confirm("Deseja realmente sair?")) {
      userService.logout();
      setUser({});
      history.push("/");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h3 className="navbar-brand">Latecoere VR</h3>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li
            className="nav-item m-1 btn btn-sm  btn-primary"
            onClick={() => history.push("/register")}
            hidden={user}
          >
            <i className="fa fa-user-plus"></i>
            Cadastrar-se
          </li>
          <li
            className="nav-item m-1 btn btn-sm btn-success"
            hidden={user}
            onClick={() => history.push("/")}
          >
            <i className="fa fa-sign-in"></i>
            Entrar
          </li>
          <li
            className="nav-item m-1 btn btn-sm btn-info"
            hidden={!user || !user.admin}
            onClick={() => history.push("/dashboard")}
          >
            <i className="fa fa-edit"></i>
            Dashboard
          </li>
          <li
            className="nav-item m-1 btn btn-sm  btn-dark"
            hidden={!user}
            onClick={() => history.push("/ranking")}
          >
            <i className="fa fa-star"></i>
            Ranking
          </li>

          <li
            className="nav-item m-1 btn btn-sm  btn-warning"
            hidden={!user}
            onClick={() => history.push("/assembly")}
          >
            <i className="fa fa-wrench"></i>
            Montagens
          </li>

          <li
            className="nav-item m-1 btn btn-sm  btn-secondary"
            hidden={!user || !user.admin}
            onClick={() => history.push("/users")}
          >
            <i className="fa fa-users"></i>
            Usuários
          </li>
          <li
            className="nav-item m-1 btn btn-sm btn-danger"
            hidden={!user}
            onClick={handleLogout}
          >
            <i className="fa fa-sign-out"></i>
            Sair
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
