import axios from "../../services/api";
class LoginSrv {
    url = "/usuario/login";
    async incluir(data) {
        console.log(data);
        return await axios.post(this.url, data).catch(err => { throw err; });
    }

}
export default new LoginSrv();