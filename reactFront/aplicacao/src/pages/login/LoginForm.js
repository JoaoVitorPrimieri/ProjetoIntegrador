import "./index.css";

import logo from "../../Componentes/img/logo.svg";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import LoginSrv from "./LoginSrv";
import "primeicons/primeicons.css";

const LoginFormulario = (props) => {
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setCredenciais({ ...credenciais, [id]: value });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toastRef = useRef();
  const [credenciais, setCredenciais] = useState({
    usuemail: "",
    ususenha: "",
  });
  const onSubmit = (data) => {
    LoginSrv.login(credenciais).then((response) => {
      let token = response.data;

      if (token) {
        sessionStorage.setItem("token", token);
        console.log(token);
        window.location = "/";
      } else {
        toastRef.current.show({
          severity: "error",
          summary: "Erro no login",
          life: 5000,
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="form">
          <h2>Login</h2>
          <input
            className="inputs"
            type="text"
            name="usuemail"
            placeholder="Email"
            id="usuemail"
            value={credenciais.usuemail}
            onChange={handleInputChange}
          />
          <br></br>
          <input
            className="inputs"
            type="password"
            name="usuenha"
            placeholder="Senha"
            id="ususenha"
            value={credenciais.ususenha}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            label="Entrar"
            className="p-button-raised p-button-rounded p-button-success"
          ></button>
        </div>
        <div className="side">
          <img src={logo} className="img" alt="logo" />{" "}
        </div>
      </div>
    </form>
  );
};

export default LoginFormulario;
