// import React, { useEffect, useState } from "react";
// import api from '../../services/api';

// export default function Login() {
//   const [usuarios, setUsuarios] = useState([]);
//   useEffect(() => {
//     api.get("/api/usuario/login")
//        .then((response) => {
//          console.log(response);
//          setUsuarios(response.data)
//       })
//       .catch((err) => {
//         console.error("ops! ocorreu um erro : " + err);
//       });
//   }, []);
//   return (
//     <div className="produto-container">
//        <h1>Relação de Usuarios de Login</h1>
//         <ul>
//            {usuarios.map(usuario => (
//              <li key={usuario.usuEmail}>
//                 <b>Email:</b>{usuario.usuEmail}<br/>
//                 <b>Senha:</b>{usuario.usuSenha}<br/>
//             </li>
//          ))}
//          {console.log(usuario.usuEmail)}
//         </ul>
//     </div>
//   );
// }