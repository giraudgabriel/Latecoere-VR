import React from "react";
import userService from "../services/UserService";
import { useHistory } from "react-router-dom";
const Menu = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const history = useHistory();

  function handleLogout() {
    if (window.confirm("Deseja realmente sair?")) {
      userService.logout();
      history.push("/");
    }
  }

  const routes = [
    {
      btnClass: "primary",
      iconClass: "fa fa-user-plus",
      route: "/register",
      text: "Cadastrar-se",
      hidden: user,
    },
    {
      btnClass: "success",
      iconClass: "fa fa-sign-in",
      route: "/",
      text: "Login",
      hidden: user,
    },
    {
      btnClass: "info",
      iconClass: "fa fa-edit",
      route: "/dashboard",
      text: "Dashboard",
      hidden: !user || !user.isAdmin,
    },
    {
      btnClass: "dark",
      iconClass: "fa fa-star",
      route: "/ranking",
      text: "Ranking",
      hidden: !user,
    },
    {
      btnClass: "warning",
      iconClass: "fa fa-wrench",
      route: "/assembly",
      text: "Montagens",
      hidden: !user,
    },
    {
      btnClass: "secondary",
      iconClass: "fa fa-users",
      route: "/users",
      text: "Usuários",
      hidden: !user || !user.isAdmin,
    },
    {
      btnClass: "danger",
      iconClass: "fa fa-sign-out",
      route: "/logout",
      onClick: handleLogout,
      text: "Sair",
      hidden: !user,
    },
  ];

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
          {routes.map((item) => (
            <li
              key={item.route}
              className={`nav-item m-1 btn btn-sm ${
                history.location.pathname !== item.route ? "btn-outline-" : "btn-"
              }${item.btnClass} `}
              onClick={
                item.onClick ? item.onClick : () => history.push(item.route)
              }
              hidden={item.hidden}
            >
              <i className={`m-1 ${item.iconClass}`}></i>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
