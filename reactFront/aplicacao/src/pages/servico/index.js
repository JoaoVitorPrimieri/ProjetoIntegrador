// import React, { useEffect, useState } from "react";
// import api from '../../services/api';
// import './styles.css';
// export default function Servicos() {
//   const [servicos, setServicos] = useState([]);
//   useEffect(() => {
//     api.get("/api/servicos")
//        .then((response) => {
//          console.log(response);
//          setServicos(response.data)
//       })
//       .catch((err) => {
//         console.error("ops! ocorreu um erro : " + err);
//       });
//   }, []);
//   return (
//     <div className="produto-container">
//        <h1>Relação de Servicos</h1>
//         <ul>
//            {servicos.map(servico => (
//              <li key={servico.serId}>
//                 <b>Nome:</b>{servico.serNome}<br/>
//                 <b>Email:</b>{servico.serValorServicoBase}<br/>
//                 <b>CPF:</b>{servico.serMaquinaId}<br/>
//             </li>
//          ))}
//         </ul>
//     </div>
//   );
// }