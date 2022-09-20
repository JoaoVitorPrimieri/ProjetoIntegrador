import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./styles.css";
export default function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    useEffect(() => {
        api.get("/api/funcionarios")
            .then((response) => {
                console.log(response);
                setFuncionarios(response.data);
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro : " + err);
            });
    }, []);
    return (
        <div className="produto-container">
            <h1>Relação de Funcionários</h1>
            <ul>
                {funcionarios.map((funcionario) => (
                    <li key={funcionario.funId}>
                        <b>Nome:</b>
                        {funcionario.funNome}
                        <br />
                        <b>Email:</b>
                        {funcionario.funEmail}
                        <br />
                        <b>CPF:</b>
                        {funcionario.funCpf}
                        <br />
                        <b>Telefone:</b>
                        {funcionario.funTelefone}
                        <br />
                        <b>Endereço:</b>
                        {funcionario.funEndereco}
                        <br />
                        <b>Sexo:</b>
                        {funcionario.funSexo}
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    );
}
