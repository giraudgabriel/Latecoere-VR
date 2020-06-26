import React from "react";
import ItemScore from "./ItemScore";
import scoreService from "../services/ScoreService";

const ListScore = () => {
    const [scores,
        setScores] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await scoreService.getAll();
                setScores(data);
            } catch (error) {
                fetch("../db.json").then(response => {
                    response
                        .json()
                        .then(data => {
                            const {score} = data;
                            setScores(score);
                        });
                });
            }
        }
        fetchData();
    }, []);

    function renderScores() {
        if (scores.length > 0) {
            return scores.map(score => <ItemScore key={score.id} score={score}/>);
        } else {
            return (
                <tr className="alert alert-warning">
                    <td colSpan="7" className="text-center">
                        Nenhuma tentativa encontrada
                    </td>
                </tr>
            );
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <h1 >Ranking de Tentativas</h1> <span className="m-3 badge alert-success">Seus dados</span>
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
                        </tr>
                    </thead>
                    <tbody>{renderScores()}</tbody>
                </table>
            </div>
        </div>
    );
};

export default ListScore;
