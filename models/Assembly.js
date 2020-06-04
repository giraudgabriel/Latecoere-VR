class Assembly {
    constructor(pieces = [Piece], name, id = assemblyController.getAll().length + 1) {
        this.id = id;
        this.name = name;
        this.pieces = pieces;
    }

    addPiece(piece = new Piece()) {
        this
            .pieces
            .push(piece)
        assemblyController.patch(this)
    }
}