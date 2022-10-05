import "./css/App.css";
import React, {Suspense, lazy, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from'./Menu'
import LoginPage from'./pages/login/index'
import HomePage from './pages/home/index'
// import LoginForm from './pages/login/LoginForm'

// const Home = lazy(() => import('./pages/home/home'));
   const UsuarioCon = lazy(() => import('./pages/usuario/UsuarioCon'));
   const FuncionarioCon = lazy(() => import('./pages/funcionario/FuncionarioCon'));
   const ClienteCon = lazy(() => import('./pages/cliente/ClienteCon'));
   const MaquinaCon = lazy(() => import('./pages/maquina/MaquinaCon'));
   const ServicoCon = lazy(() => import('./pages/servico/ServicoCon'));
   const AgendamentoCon = lazy(() => import('./pages/agendamento/AgendamentoCon'));
  //  const Login = lazy(() => import('./pages/login/LoginForm'));



function App() {

  // const [token, setToken] = useState([])
  // useEffect(() => {
  // setToken(sessionStorage.getItem('token'));
  // }, []);
  // if (!token) {
  // return <LoginForm/>
  // }



  return <div>
<div className="head">
    <BrowserRouter>
    <Menu/>
      <Suspense fallback={<div>Carregando ...</div>}>
        <Routes>
          {/* <Route path="/" element={<LoginPage/>} /> */}
          {/* <Route index path="/login" element={<Login />} /> */}
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
    
    </div>
}




export default App;