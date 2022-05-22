import React from "react";
import ItemScore from "./ItemScore";
import scoreService from "../services/ScoreService";
import Input from "./Input";

const ListScore = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [scores, setScores] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await scoreService.getAll(
          user.isAdmin ? null : user.id
        );
        setScores(data);
      } catch (error) {
        fetch("../db.json").then((response) => {
          response.json().then((data) => {
            const { score } = data;
            setScores(score);
          });
        });
      }
    }
    fetchData();
  }, [user]);

  const filterText = React.useCallback(
    (obj) => {
      return Object.values(obj).some((value) => {
        if (value != null) {
          if (typeof value == "object") return filterText(value);
          return value
            .toString()
            .trim()
            .toLowerCase()
            .includes(filter.toLowerCase().trim());
        }
        return false;
      });
    },
    [filter]
  );

  const getScores = React.useCallback(() => {
    return scores.filter((score) => filterText(score));
  }, [filterText, scores]);

  const renderScores = React.useMemo(() => {
    if (scores.length > 0) {
      return getScores().map((score) => (
        <ItemScore key={score.id} score={score} />
      ));
    } else {
      return (
        <tr className="alert alert-warning">
          <td colSpan="7" className="text-center">
            Nenhuma tentativa encontrada
          </td>
        </tr>
      );
    }
  }, [scores, getScores]);

  return (
    <div className="card">
      <div className="card-header">
        <h1>Ranking de Tentativas</h1>{" "}
        <span className="m-3 badge alert-success">Seus dados</span>
        <Input
          placeholder={"Digite para procurar..."}
          handleInput={setFilter}
          value={filter}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th>Data</th>
              <th>Usuário</th>
              <th>Ordem</th>
              <th>Tentativas</th>
              <th>Acertos</th>
              <th>Erros</th>
              <th>Aproveitamento</th>
              <th>Montagem</th>
            </tr>
          </thead>
          <tbody>{renderScores}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ListScore;
