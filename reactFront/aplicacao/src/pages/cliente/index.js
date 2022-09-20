import React, { useEffect, useState } from "react";
import api from '../../services/api';
import './styles.css';
export default function Cleintes() {
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    api.get("/api/clientes")
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
       <h1>Relação de Clientes</h1>
        <ul>
           {clientes.map(clientes => (
             <li key={clientes.cliId}>
                <b>Nome:</b>{clientes.cliNome}<br/>
                <b>Email:</b>{clientes.cliEmail}<br/>
                <b>CPF:</b>{clientes.cliCpf}<br/>
                <b>Telefone:</b>{clientes.cliTelefone}<br/>
                <b>Endereço:</b>{clientes.cliEndereco}<br/>
                <b>Sexo:</b>{clientes.cliSexo}<br/>
            </li>
         ))}
        </ul>
    </div>
  );
}