import api from "../api";

class ScoreService {
  getById(id) {
    return api.get(`/score/${id}`);
  }
  getAll() {
    return api.get("/score");
  }
  add(score) {
    return api.post("/score", score);
  }
  patch(score) {
    return api.patch(`/score/${score.id}`, score);
  }
  delete(id) {
    return api.delete(`/score/${id}`);
  }
}

export default new ScoreService();
