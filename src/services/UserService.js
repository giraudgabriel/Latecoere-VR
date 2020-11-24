import api from "../api";

class UserService {
  getById(id) {
    return api.get(`/user/${id}`);
  }
  getAll() {
    return api.get("/user");
  }
  async login(username, password) {
    const response = await api.post(`/login`, { username, password });
    if (response.data) {
      if (response.data.length === 1) {
        const user = response.data[0];
        sessionStorage.setItem("user", JSON.stringify(user));
        return user;
      }
      return null;
    } else {
      alert("Usuário não encontrado!");
      return null;
    }
  }
  add(user) {
    return api.post("/user", user);
  }
  patch(user) {
    return api.patch(`/user/${user.id}`, user);
  }
  delete(id) {
    return api.delete(`/user/${id}`);
  }
  logout() {
    sessionStorage.removeItem("user");
  }
}

export default new UserService();
