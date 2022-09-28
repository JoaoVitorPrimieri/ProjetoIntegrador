import React, { useEffect, useState } from "react";
import api from '../../services/api';
import './styles.css';
export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  useEffect(() => {
    api.get("/api/agendamentos")
       .then((response) => {
         console.log(response);
         setAgendamentos(response.data)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro : " + err);
      });
  }, []);
  return (
    <div className="produto-container">
       <h1>Relação de Agendamentos</h1>
        <ul>
           {agendamentos.map(agendamento => (
             <li key={agendamento.agdId}>
                <b>Data:</b>{agendamento.agdData}<br/>
                <b>Funcionario:</b>{agendamento.agdFuncionario}<br/>
                <b>Servico:</b>{agendamento.agdServico}<br/>
                <b>Usuario:</b>{agendamento.agdUsuario}<br/>
                <b>Cliente:</b>{agendamento.agdCliente}<br/>
                <b>Qunatidade de horas:</b>{agendamento.agdqtdHoras}<br/>
                <b>Valor:</b>{agendamento.agdValorTotal}<br/>
            </li>
         ))}
        </ul>
    </div>
  );
}