import scoreService from "../services/ScoreService";

class Score {
  constructor(erros, acertos, ordem, user, assembly) {
    this.tentativas = acertos + erros;
    this.aproveitamento = (acertos / this.tentativas) * 100.0;
    this.erros = erros;
    this.ordem = ordem;
    this.acertos = acertos;
    this.date = new Date();
    this.user = user;
    this.assembly = assembly;
    scoreService.add(this);
  }
}

export default Score;
