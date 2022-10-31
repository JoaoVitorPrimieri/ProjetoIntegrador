import axios from "../../services/api";
class LoginSrv {
  url = "/usuario/login";
  async login(data) {
    return await axios.post(this.url, data).catch((err) => {
      throw err;
    });
  }
}
export default new LoginSrv();
