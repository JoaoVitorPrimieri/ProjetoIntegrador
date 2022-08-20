const express = require("express");
const cors = require("cors");

const app = express();
//Rotas da API:

const index = require("./routes/index");

const usuarioRoute = require('./routes/usuarioRoute');
const funcionarioRoute = require('./routes/funcionarioRoute');
const clienteRoute = require('./routes/clienteRoute');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.json({ type: "application/vnd.api+json" }));

app.use(cors());

app.use(index);

app.use('/api/', usuarioRoute);
app.use('/api/', funcionarioRoute);
app.use('/api/', clienteRoute);

module.exports = app;
