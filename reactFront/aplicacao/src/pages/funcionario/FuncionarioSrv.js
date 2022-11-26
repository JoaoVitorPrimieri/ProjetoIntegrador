import axios from "../../services/api";
class FuncionarioSrv {
  url = "/funcionarios";
  async listar() {
    return await axios.get(this.url).catch((err) => {
      throw err;
    });
  }
  async listarById(funid) {
    return await axios.get(this.url + "/" + funid).catch((err) => {
      throw err;
    });
  }

  async incluir(data) {
    return await axios.post(this.url, data).catch((err) => {
      throw err;
    });
  }
  async alterar({ funid, ...data }) {
    return await axios.put(`${this.url}/${funid}`, { ...data }).catch((err) => {
      throw err;
    });
  }
  async excluir(id) {
    return await axios.delete(`${this.url}/${id}`).catch((err) => {
      throw err;
    });
  }
  async obterPeloId(id) {
    return await axios.get(`${this.url}/${id}`).catch((err) => {
      throw err;
    });
  }
  async filtrar(filtro) {
    return await axios.get(`${this.url}/filtro/${filtro}`).catch((err) => {
      throw err;
    });
  }
}
export default new FuncionarioSrv();
