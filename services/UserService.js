class UserService {
    getById(id) {
        return api.get(`/user/${id}`);
    }
    getAll() {
        return api.get('/user');
    }
    add(user) {
        return api.post('/user', user);
    }
    patch(user) {
        return api.patch(`/user/${user.id}`, user);
    }
    delete(id) {
        return api.delete(`/user/${id}`);
    }
}
