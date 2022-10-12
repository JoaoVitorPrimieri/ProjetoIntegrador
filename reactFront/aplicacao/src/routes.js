import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import Rodape from "./Componentes/comp/rodape";
// import Login from "./pages/login/indexx"

const UsuarioCon = lazy(() => import("./pages/usuario/UsuarioCon"));
const FuncionarioCon = lazy(() => import("./pages/funcionario/FuncionarioCon"));
const ClienteCon = lazy(() => import("./pages/cliente/ClienteCon"));
const MaquinaCon = lazy(() => import("./pages/maquina/MaquinaCon"));
const ServicoCon = lazy(() => import("./pages/servico/ServicoCon"));
const AgendamentoCon = lazy(() => import("./pages/agendamento/AgendamentoCon"));
const Login = lazy(() => import("./pages/login/indexx"));

function Rotas() {
  return (
    <div>
      <BrowserRouter>  
        <Suspense fallback={<div>Carregando ...</div>}>
        <Menu />
          <Routes>
            {/* <Route path="/" element={<LoginPage/>} /> */}
            <Route exact path="/login" element={<Login />} />
            <Route path="/usuarios" element={<UsuarioCon />} />
            <Route path="/funcionarios" element={<FuncionarioCon />} />
            <Route path="/clientes" element={<ClienteCon />} />
            <Route path="/maquinas" element={<MaquinaCon />} />
            <Route path="/servicos" element={<ServicoCon />} />
            <Route path="/agendamentos" element={<AgendamentoCon />} />
          </Routes>
          <Rodape />
        </Suspense>
        
      </BrowserRouter>
    </div>
  );
}

export default Rotas;
