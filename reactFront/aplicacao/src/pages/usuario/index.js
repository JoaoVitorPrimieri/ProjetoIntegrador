import React, { useEffect, useState } from "react";
import api from '../../services/api';
import './styles.css';
export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    api.get("/api/usuarios")
       .then((response) => {
         console.log(response);
         setUsuarios(response.data)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro : " + err);
      });
  }, []);
  return (
    <div className="produto-container">
       <h1>Relação de Usuarios</h1>
        <ul>
           {usuarios.map(usuario => (
             <li key={usuario.usuId}>
                <b>Nome:</b>{usuario.usuNome}<br/>
                <b>Email:</b>{usuario.usuEmail}<br/>
                <b>CPF:</b>{usuario.usuCpf}<br/>
                <b>Telefone:</b>{usuario.usuTelefone}<br/>
                <b>Endereço:</b>{usuario.usuEndereco}<br/>
                <b>Sexo:</b>{usuario.usuSexo}<br/>
                <b>Senha:</b>{usuario.usuSenha}<br/>
            </li>
         ))}
        </ul>
    </div>
  );
}