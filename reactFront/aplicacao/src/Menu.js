import React from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import "../src/components/css/App.css";

function Menu() {
  let navigate = useNavigate();
  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Cadastro",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Agendamento",
          icon: "pi pi-book",
          command: () => {
            navigate("/agendamentos");
          },
        },
        {
          label: "Cliente",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/clientes");
          },
        },
        {
          label: "Funcionário",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/funcionarios");
          },
        },
        {
          label: "Usuários",
          icon: "pi pi-id-card",
          command: () => {
            navigate("/usuarios");
          },
        },
        {
          label: "Maquina",
          icon: "pi pi-paperclip",
          command: () => {
            navigate("/maquinas");
          },
        },
        {
          label: "Serviço",
          icon: "pi pi-briefcase",
          command: () => {
            navigate("/servicos");
          },
        },
      ],
    },
    {
      label: "Sair",
      icon: "pi pi-sign-out",
      command: () => {
        localStorage.setItem("token", "");
      },
      url: "/",
    },
  ];

  return <Menubar model={items} className="ui-menubar" />;
}
export default Menu;
