import assemblyService from '../services/AssemblyService';
import Piece from '../models/Piece';

class Assembly {
    constructor(pieces = [Piece], name, id = assemblyService.getAll().length + 1) {
        this.id = id;
        this.name = name;
        this.pieces = pieces;
    }

    addPiece(piece = new Piece()) {
        this
            .pieces
            .push(piece)
        assemblyService.patch(this)
    }
}

export default Assembly;