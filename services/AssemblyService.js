class AssemblyController {
    getById(id) {
        return api.get(`/assembly/${id}`);
    }
    getAll() {
        return api.get('/assembly');
    }
    add(assembly) {
        return api.post('/assembly', assembly);
    }
    patch(assembly) {
        return api.patch(`/assembly/${assembly.id}`, assembly);
    }
    delete(id) {
        return api.delete(`/assembly/${id}`);
    }
}
