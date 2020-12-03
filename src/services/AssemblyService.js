import api from "../api";

class AssemblyService {
  getById(id) {
    return api.get(`/assembly?id=${id}`);
  }
  getAll() {
    return api.get("/assemblies");
  }
  add(assembly) {
    return api.post("/assembly", assembly);
  }
  patch(assembly) {
    return api.patch(`/assembly/${assembly._id}`, assembly);
  }
  delete(id) {
    return api.delete(`/assembly/${id}`);
  }
}

export default new AssemblyService();
