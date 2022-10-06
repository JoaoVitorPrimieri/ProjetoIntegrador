// import React, { useState } from "react";
// // import api from "../../services/api";
// import LoginSrv from "./LoginSrv";
// function Login(props) {
//   const [usuario, setUsuario] = useState([]);
//   const [email, setEmail] = useState("");
//   const [senha, setSenha] = useState("");
//   function buscaUsuario() {

//     LoginSrv.incluir(usuario).then((response) => {
//       setUsuario(response.data);
//     });
//   }
//   function alterarEmail(event) {
//     setEmail(event.target.value);
//   }
//   function alterarSenha(event) {
//     setSenha(event.target.value);
//   }
//   return (
//     <div>
//       <input type="text" value={email} onChange={alterarEmail} />
//       <input type="password" value={senha} onChange={alterarSenha} />
//       <button onClick={() => buscaUsuario({ email, senha })} type="button">
//         Entrar
//       </button>
//     </div>
//   );
// }

// export default Login;
