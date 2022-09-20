import React, { useEffect, useState } from "react";
import api from '../../services/api';
import './styles.css';
export default function Maquinas() {
  const [maquinas, setMaquinas] = useState([]);
  useEffect(() => {
    api.get("/api/maquinas")
       .then((response) => {
         console.log(response);
         setMaquinas(response.data)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro : " + err);
      });
  }, []);
  return (
    <div className="produto-container">
       <h1>Relação de Maquinas</h1>
        <ul>
           {maquinas.map(maquinas => (
             <li key={maquinas.maqId}>
                <b>Modelo:</b>{maquinas.maqModelo}<br/>
                <b>Marca:</b>{maquinas.maqMarca}<br/>
                <b>Tipo Combustivel:</b>{maquinas.maqTipoCombustivel}<br/>
                <b>Ano Fabricação:</b>{maquinas.maqAnoFabricacao}<br/>
                <b>Número do chassi:</b>{maquinas.maqnmrChassi}<br/>
            </li>
         ))}
        </ul>
    </div>
  );
}