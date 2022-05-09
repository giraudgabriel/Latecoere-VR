import React from "react";

const ItemScore = ({ score }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  function renderItem() {
    return (
      <tr
        className={user.username === score.user.username ? "alert-success" : ""}
      >
        <td>{new Date(score.date).toLocaleString()}</td>
        <td>{score.user.username}</td>
        <td>{JSON.stringify(score.ordem)}</td>
        <td>{score.tentativas}</td>
        <td>{score.acertos}</td>
        <td>{score.erros}</td>
        <td>{score.aproveitamento.toFixed(2) + "%"}</td>
        <td>{score?.assembly?.name}</td>
      </tr>
    );
  }

  return renderItem();
};

export default ItemScore;
