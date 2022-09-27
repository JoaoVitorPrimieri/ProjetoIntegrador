import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Usuarios from "./pages/usuario";
import Funcionarios from "./pages/funcionario";
import Clientes from "./pages/cliente";
import Maquinas from "./pages/maquina";
import Servicos from "./pages/servico";
import Inicio from "./pages/inicio";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Inicio} />
        <Route path="/usuarios" component={Usuarios} />
        <Route path="/funcionarios" component={Funcionarios}/>
        <Route path="/clientes" component={Clientes}/>
        <Route path="/maquinas" component={Maquinas}/>
        <Route path="/servicos" component={Servicos}/>
      </Switch>
    </BrowserRouter>
  );
}
