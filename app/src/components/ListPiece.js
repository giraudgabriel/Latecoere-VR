import React from 'react';
import ItemPiece from './ItemPiece';

const ListPiece = ({setSelectedPiece}) => {
    const [pieces,
        setPieces] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await assemblyService.getAll()[0]['pieces'];
                setPieces(data);
            } catch (error) {
                fetch('../db.json').then(response => {
                    response
                        .json()
                        .then(data => {
                            const {assembly} = data;
                            setPieces(assembly[0]['pieces']);
                        });
                })
            }
        }
        fetchData();
    }, []);

    return <div className="m-3">
        <h3 className="text-center">
            Lista de Peças</h3>
        <table className="table table-bordered">
            <thead>
                <tr className="text-center">
                    <th>ID</th>
                    <th>GLTF</th>
                    <th>IMAGEM</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {pieces.map(piece => (<ItemPiece key={piece.id} piece={piece} handleSelected={setSelectedPiece}/>))}
            </tbody>
        </table>
    </div>
}

export default ListPiece;