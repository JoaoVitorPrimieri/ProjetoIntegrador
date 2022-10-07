import "./Componentes/css/App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import Rotas from "./routes";

function App() {
  // const [token, setToken] = useState([])
  // useEffect(() => {
  // setToken(sessionStorage.getItem('token'));
  // }, []);
  // if (!token) {
  // return <LoginForm/>
  // }

  return (
    <div className="app">
      <Rotas />
    </div>
  );
}

export default App;
