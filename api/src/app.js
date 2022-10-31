const express = require("express");
const cors = require("cors");

const app = express();
//Rotas da API:

const index = require("./routes/index");

const usuarioRoute = require("./routes/usuarioRoute");
const funcionarioRoute = require("./routes/funcionarioRoute");
const clienteRoute = require("./routes/clienteRoute");
const maquinaRoute = require("./routes/maquinaRoute");
const servicoRoute = require("./routes/servicoRoute");
const agendamentoRoute = require("./routes/agendamentoRoute");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.json({ type: "application/vnd.api+json" }));

app.use(cors());

app.use(index);

app.use("/api", usuarioRoute);

const jwt = require("jsonwebtoken");

app.use(function (req, res, next) {
  // interceptar as requisições a validar o token
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(403).send({
        message: "Não possui token de autenticação. Acesso não autorizado!",
      });
    jwt.verify(token, process.env.JWT_PRIV_KEY, function (err, decoded) {
      if (err)
        return res.status(500).send({
          auth: false,
          message: "Token inválido. Acesso não autorizado!",
        });
      // estando tudo certo guarda no request para uso posterior
      req.usuemail = decoded.usuemail;
      req.ususenha = decoded.ususenha;
      next();
    });
  } catch (error) {
    res.status(400).send("Erro no token de autenticação!");
  }
});

app.use("/api", funcionarioRoute);
app.use("/api", clienteRoute);
app.use("/api", maquinaRoute);
app.use("/api", servicoRoute);
app.use("/api", agendamentoRoute);

module.exports = app;
