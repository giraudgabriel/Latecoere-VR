class ObjectController {
    getById(id) {
        return api.get(`/object/${id}`);
    }
    getAll() {
        return api.get('/object');
    }
    add(object) {
        return api.post('/object', object);
    }
    patch(object) {
        return api.patch('/object', object);
    }
}
