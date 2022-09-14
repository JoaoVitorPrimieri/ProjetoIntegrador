import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Usuarios from './pages/usuario';
import Inicio from './pages/inicio'

export default function Routes(){
return (
<BrowserRouter>
<Switch>
 <Route path="/" exact component={Inicio}/>
<Route path="/usuarios" component={Usuarios}/>
</Switch>
</BrowserRouter>
);
}