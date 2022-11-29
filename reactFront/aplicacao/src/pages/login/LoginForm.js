import "../../components/css/login.css";
import { InputText } from "primereact/inputtext";

import logo from "../../components/img/image.svg";
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
      let token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
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
          <InputText
            placeholder="Email"
            className="test"
            type="text"
            name="usuemail"
            {...register("usuemail", {
              required: {
                value: true,
                message: "O email é obrigatório",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Email inválido",
              },
            })}
            id="usuemail"
            value={credenciais.usuemail}
            onChange={handleInputChange}
          />
          {errors.usuemail && (
            <span className="spans">{errors.usuemail.message}</span>
          )}
          <br></br>
          <InputText
            placeholder="Senha"
            className="test"
            type="password"
            name="ususenha"
            {...register("ususenha", {
              required: {
                value: true,
                message: "A senha é obrigatória",
              },
            })}
            id="ususenha"
            value={credenciais.ususenha}
            onChange={handleInputChange}
          />
          {errors.ususenha && (
            <span className="spans">{errors.ususenha.message}</span>
          )}
          <br></br>
          <button type="submit" className="button">
            Entrar
          </button>
        </div>
        <div className="side">
          <img src={logo} className="img" alt="logo" />{" "}
        </div>
      </div>
    </form>
  );
};

export default LoginFormulario;
