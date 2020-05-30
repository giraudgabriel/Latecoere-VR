class PieceController {
    getById(id) {
        return api.get(`/piece/${id}`);
    }
    getAll() {
        return api.get('/piece');
    }
    add(piece) {
        return api.post('/piece', piece);
    }
    patch(piece) {
        return api.patch(`/piece/${piece.id}`, piece);
    }
    delete(id) {
        return api.delete(`/piece/${id}`);
    }
}
