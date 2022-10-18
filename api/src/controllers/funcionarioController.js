const db = require("../config/database");
const VerificarEmpty = require("../validacoes/verificaEmpty");

exports.createFuncionarios = async (req, res) => {
  const { funnome, funemail, funcpf, funtelefone, funendereco, funsexo } =
    req.body;

  const verificador = VerificarEmpty([
    { nome: "Nome", valor: funnome },
    { nome: "Email", valor: funemail },
    { nome: "CPF", valor: funcpf },
    { nome: "Telefone", valor: funtelefone },
    { nome: "Endereço", valor: funendereco },
    { nome: "Sexo", valor: funsexo },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const { rows } = await db.query(
      "INSERT INTO funcionarios (funnome, funemail, funcpf, funtelefone, funendereco, funsexo) VALUES ($1, $2, $3, $4, $5, $6)",
      [funnome, funemail, funcpf, funtelefone, funendereco, funsexo]
    );
    res.status(201).send({
      message: "Funionario adicionado com sucesso!",
      body: {
        funcionarios: {
          funnome,
          funemail,
          funcpf,
          funtelefone,
          funendereco,
          funsexo,
        },
      },
    });
  }
};

exports.listAllFuncionarios = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM funcionarios ORDER BY funnome ASC"
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
  const { funnome, funemail, funcpf, funtelefone, funendereco, funsexo } =
    req.body;
  const verificador = VerificarEmpty([
    { nome: "Id", valor: funid },
    { nome: "Nome", valor: funnome },
    { nome: "Email", valor: funemail },
    { nome: "CPF", valor: funcpf },
    { nome: "Telefone", valor: funtelefone },
    { nome: "Endereço", valor: funendereco },
    { nome: "Sexo", valor: funsexo },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const response = await db.query(
      "UPDATE funcionarios SET funnome = $1, funemail = $2, funcpf = $3, funtelefone = $4, funendereco = $5, funsexo = $6 WHERE funid = $7",
      [funnome, funemail, funcpf, funtelefone, funendereco, funsexo, funid]
    );

    res.status(200).send({ message: "Funcionario editado com sucesso!" });
  }
};
exports.deleteFuncionariosById = async (req, res) => {
  const funid = parseInt(req.params.id);
  await db.query("DELETE FROM funcionarios WHERE funid = $1", [funid]);

  res.status(200).send({ message: "Funcionario deleado com sucesso!", funid });
};
