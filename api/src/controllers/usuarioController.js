const db = require("../config/database");
const VerificarEmpty = require("../validacoes/verificaEmpty");

exports.createUsuarios = async (req, res) => {
  const {
    usuNome,
    usuEmail,
    usuCpf,
    usuTelefone,
    usuEndereco,
    usuSexo,
    usuSenha,
  } = req.body;

  const verificador = VerificarEmpty([
    { nome: "Nome", valor: usuNome },
    { nome: "Email", valor: usuEmail },
    { nome: "CPF", valor: usuCpf },
    { nome: "Telefone", valor: usuTelefone },
    { nome: "Endereço", valor: usuEndereco },
    { nome: "Senha", valor: usuSenha },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const { rows } = await db.query(
      "INSERT INTO usuarios (usuNome, usuEmail, usuCpf, usuTelefone, usuEndereco, usuSexo, usuSenha) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        usuNome,
        usuEmail,
        usuCpf,
        usuTelefone,
        usuEndereco,
        usuSexo,
        usuSenha,
      ]
    );
    res.status(201).send({
      message: "Usuario adicionado com sucesso!",
      body: {
        usuarios: {
          usuNome,
          usuEmail,
          usuCpf,
          usuTelefone,
          usuEndereco,
          usuSexo,
          usuSenha,
        },
      },
    });
  }
};
exports.listAllUsuarios = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM usuarios ORDER BY usuNome ASC"
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
    usuNome,
    usuEmail,
    usuCpf,
    usuTelefone,
    usuEndereco,
    usuSexo,
    usuSenha,
  } = req.body;
  
  const verificador = VerificarEmpty([
    { nome: "Nome", valor: usuNome },
    { nome: "Email", valor: usuEmail },
    { nome: "CPF", valor: usuCpf },
    { nome: "Telefone", valor: usuTelefone },
    { nome: "Endereço", valor: usuEndereco },
    { nome: "Senha", valor: usuSenha },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
  const response = await db.query(
    "UPDATE usuarios SET usuNome = $1, usuEmail = $2, usuCpf = $3, usuTelefone = $4, usuEndereco = $5, usuSexo = $6, usuSenha = $7 WHERE usuid = $8",
    [
      usuNome,
      usuEmail,
      usuCpf,
      usuTelefone,
      usuEndereco,
      usuSexo,
      usuSenha,
      usuid,
    ]
  );

  res.status(200).send({ message: "Usuario editado com sucesso!" });
};
};
exports.deleteUsuariosById = async (req, res) => {
  const usuid = parseInt(req.params.id);
  await db.query("DELETE FROM usuarios WHERE usuid = $1", [usuid]);

  res.status(200).send({ message: "Usuario deletado com sucesso!", usuid });
};
// exports.login = async (req, res) => {
//   const usuEmail = req.params.email;  
//   const response = await db.query(
//     "SELECT usuEmail usuSenha FROM usuarios WHERE usuEmail = $1", [usuEmail]);
//   res.status(200).send(response.rows);
// };