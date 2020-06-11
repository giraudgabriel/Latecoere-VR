import React from "react";

const ItemScore = ({ score }) => {
  function renderItem() {
    return (
      <tr>
        <td>{new Date(score.date).toLocaleString()}</td>
        <td>{JSON.stringify(score.ordem)}</td>
        <td>{score.tentativas}</td>
        <td>{score.acertos}</td>
        <td>{score.erros}</td>
        <td>{score.aproveitamento.toFixed(2) + "%"}</td>
      </tr>
    );
  }

  return renderItem();
};

export default ItemScore;
