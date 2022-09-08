const db = require("../config/database");
const VerificarEmpty = require("../validacoes/verificaEmpty");

exports.createFuncionarios = async (req, res) => {
  const { funNome, funEmail, funCpf, funTelefone, funEndereco, funSexo } =
    req.body;

  const verificador = VerificarEmpty([
    { nome: "Nome", valor: funNome },
    { nome: "Email", valor: funEmail },
    { nome: "CPF", valor: funCpf },
    { nome: "Telefone", valor: funTelefone },
    { nome: "Endereço", valor: funEndereco },
    { nome: "Sexo", valor: funSexo },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const { rows } = await db.query(
      "INSERT INTO funcionarios (funNome, funEmail, funCpf, funTelefone, funEndereco, funSexo) VALUES ($1, $2, $3, $4, $5, $6)",
      [funNome, funEmail, funCpf, funTelefone, funEndereco, funSexo]
    );
    res.status(201).send({
      message: "Funionario adicionado com sucesso!",
      body: {
        funcionarios: {
          funNome,
          funEmail,
          funCpf,
          funTelefone,
          funEndereco,
          funSexo,
        },
      },
    });
  }
};

exports.listAllFuncionarios = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM funcionarios ORDER BY funNome ASC"
  );
  res.status(200).send(response.rows);
};

exports.findFuncionariosById = async (req, res) => {
  const funid = parseInt(req.params.id);
  const response = await db.query(
    "SELECT * FROM funcionarios WHERE funid = $1",
    [funid]
  );
  res.status(200).send(response.rows);
};

exports.updateFuncionariosById = async (req, res) => {
  const funid = parseInt(req.params.id);
  const { funNome, funEmail, funCpf, funTelefone, funEndereco, funSexo } =
    req.body;
    const verificador = VerificarEmpty([
      { nome: "Id", valor: funid },
      { nome: "Nome", valor: funNome },
      { nome: "Email", valor: funEmail },
      { nome: "CPF", valor: funCpf },
      { nome: "Telefone", valor: funTelefone },
      { nome: "Endereço", valor: funEndereco },
      { nome: "Sexo", valor: funSexo },
    ]);
    if (verificador) {
      res.status(500).send({
        message: verificador,
      });
    } else {
  const response = await db.query(
    "UPDATE funcionarios SET funNome = $1, funEmail = $2, funCpf = $3, funTelefone = $4, funEndereco = $5, funSexo = $6 WHERE funid = $7",
    [funNome, funEmail, funCpf, funTelefone, funEndereco, funSexo, funid]
  );

  res.status(200).send({ message: "Funcionario editado com sucesso!" });
};
};
exports.deleteFuncionariosById = async (req, res) => {
  const funid = parseInt(req.params.id);
  await db.query("DELETE FROM funcionarios WHERE funid = $1", [funid]);

  res.status(200).send({ message: "Funcionario deleado com sucesso!", funid });
};
