import api from "../api";

class UserService {
  getById(id) {
    return api.get(`/user?id=${id}`);
  }
  getAll() {
    return api.get("/users");
  }
  async login(username, password) {
    const response = await api.post(
      `/login`,
      JSON.stringify({ username, password })
    );
    if (response.data && response.data.status !== 404) {
      const user = response.data;
      sessionStorage.setItem("user", JSON.stringify(user));
      return user;
    } else {
      alert("Usuário não encontrado!");
      return null;
    }
  }
  add(user) {
    return api.post("/user", user);
  }
  async put(user) {
    return await api.put(`/user`, user);
  }
  delete(_id) {
    return api.delete(`/user`, { data: { _id } });
  }
  logout() {
    sessionStorage.removeItem("user");
  }
}

export default new UserService();
