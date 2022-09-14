import React from "react";
import { Menubar } from 'primereact/menubar';
import { useNavigate } from "react-router-dom";

function Menu() {
    let navigate = useNavigate();
    const items = [
      {
        label: 'Home', icon: 'pi pi-fw pi-home',
        command: () => { navigate("/")}
      },
      {
        label: 'Cadastro', icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Agendamento', icon: 'pi pi-fw pi-user',
            command: () => { navigate("/agendamentos") }
          },
          {
            label: 'Cliente', icon: 'pi pi-fw pi-user',
            command: () => { navigate("/clientes") }
          },
          {
            label: 'Funcionario', icon: 'pi pi-fw pi-user',
            command: () => { navigate("/funcionarios") }
          },
          {
            label: 'Usuarios', icon: 'pi pi-fw pi-user',
            command: () => { navigate("/usuarios") }
          },
          {
            label: 'Maquina', icon: 'pi pi-fw pi-user',
            command: () => { navigate("/maquinas") }
          }, {
            label: 'Servico', icon: 'pi pi-fw pi-user',
            command: () => { navigate("/servicos") }
          }
        ]
      },
      { label: 'Sair', icon: 'pi pi-sign-out',
      command: () => {
      sessionStorage.setItem('token',
     ''); },
      url:'/'
      },
      ];
     
    return (
    <Menubar model={items} 
    />)
  }
  export default Menu;