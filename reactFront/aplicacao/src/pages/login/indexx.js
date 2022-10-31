import "./index.css";

import logo from "../../Componentes/img/logo.svg";

function login() {
  return (
    <div>
      <div className="form">
        <h2>Login</h2>
        <input
          className="inputs"
          type="text"
          name="Email"
          placeholder="Email"
        />
        <br></br>
        <input
          className="inputs"
          type="text"
          name="Senha"
          placeholder="Senha"
        />
        <button>Entrar</button>
      </div>
      <div className="side">
        <img src={logo} className="img" alt="logo" />{" "}
      </div>
    </div>
  );
}

export default login;
