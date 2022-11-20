const { parseComplete } = require("pg-protocol/dist/messages");
const db = require("../config/database");
const VerificarEmpty = require("../validacoes/verificaEmpty");
const jwt = require("jsonwebtoken");

exports.createUsuarios = async (req, res) => {
  const {
    usunome,
    usuemail,
    usucpf,
    usutelefone,
    usuendereco,
    ususexo,
    ususenha,
  } = req.body;

  const verificador = VerificarEmpty([
    { nome: "Nome", valor: usunome },
    { nome: "Email", valor: usuemail },
    { nome: "CPF", valor: usucpf },
    { nome: "Telefone", valor: usutelefone },
    { nome: "Endereço", valor: usuendereco },
    { nome: "Senha", valor: ususenha },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const { rows } = await db.query(
      "INSERT INTO usuarios (usunome, usuemail, usucpf, usutelefone, usuendereco, ususexo, ususenha) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [usunome, usuemail, usucpf, usutelefone, usuendereco, ususexo, ususenha]
    );
    res.status(201).send({
      message: "Usuario adicionado com sucesso!",
      body: {
        usuarios: {
          usunome,
          usuemail,
          usucpf,
          usutelefone,
          usuendereco,
          ususexo,
          ususenha,
        },
      },
    });
  }
};
exports.listAllUsuarios = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM usuarios ORDER BY usunome ASC"
  );
  res.status(200).send(response.rows);
};

exports.findUsuariosById = async (req, res) => {
  const usuid = parseInt(req.params.id);
  const response = await db.query("SELECT * FROM usuarios WHERE usuid = $1", [
    usuid,
  ]);
  res.status(200).send(response.rows);
};

exports.updateUsuariosById = async (req, res) => {
  const usuid = parseInt(req.params.id);
  const {
    usunome,
    usuemail,
    usucpf,
    usutelefone,
    usuendereco,
    ususexo,
    ususenha,
  } = req.body;

  const verificador = VerificarEmpty([
    { nome: "Nome", valor: usunome },
    { nome: "Email", valor: usuemail },
    { nome: "CPF", valor: usucpf },
    { nome: "Telefone", valor: usutelefone },
    { nome: "Endereço", valor: usuendereco },
    { nome: "Senha", valor: ususenha },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const response = await db.query(
      "UPDATE usuarios SET usunome = $1, usuemail = $2, usucpf = $3, usutelefone = $4, usuendereco = $5, ususexo = $6, ususenha = $7 WHERE usuid = $8",
      [
        usunome,
        usuemail,
        usucpf,
        usutelefone,
        usuendereco,
        ususexo,
        ususenha,
        usuid,
      ]
    );

    res.status(200).send({ message: "Usuario editado com sucesso!" });
  }
};
exports.deleteUsuariosById = async (req, res) => {
  const usuid = parseInt(req.params.id);
  await db.query("DELETE FROM usuarios WHERE usuid = $1", [usuid]);

  res.status(200).send({ message: "Usuario deletado com sucesso!", usuid });
};
exports.login = async (req, res) => {
  const { usuemail, ususenha } = req.body;
  const response = await db.query(
    "SELECT usuemail, ususenha FROM usuarios WHERE usuemail = $1 AND ususenha = $2",
    [usuemail, ususenha]
  );
  if (!response.rows[0]) {
    res.status(401).send({ message: "Usuário ou senha inválidos!" });
  } else {
    const token = generateAuthToken(usuemail, ususenha);
    res.status(200).json({ token });
  }
};

const generateAuthToken = function (usuemail, ususenha) {
  const token = jwt.sign({ usuemail, ususenha }, process.env.JWT_PRIV_KEY, {
    expiresIn: process.env.TOKEN_EXPIRE,
  });

  return token;
};

exports.logout = async (req, res) => {
  res.status(200).send({ auth: false, token: null });
};
