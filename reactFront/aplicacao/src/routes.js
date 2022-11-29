import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Menu";

const UsuarioCon = lazy(() => import("./pages/usuario/UsuarioCon"));
const FuncionarioCon = lazy(() => import("./pages/funcionario/FuncionarioCon"));
const ClienteCon = lazy(() => import("./pages/cliente/ClienteCon"));
const MaquinaCon = lazy(() => import("./pages/maquina/MaquinaCon"));
const ServicoCon = lazy(() => import("./pages/servico/ServicoCon"));
const AgendamentoCon = lazy(() => import("./pages/agendamento/AgendamentoCon"));
const Home = lazy(() => import("./pages/home/index"));

function Rotas() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Carregando ...</div>}>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuarios" element={<UsuarioCon />} />
            <Route path="/funcionarios" element={<FuncionarioCon />} />
            <Route path="/clientes" element={<ClienteCon />} />
            <Route path="/maquinas" element={<MaquinaCon />} />
            <Route path="/servicos" element={<ServicoCon />} />
            <Route path="/agendamentos" element={<AgendamentoCon />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default Rotas;
