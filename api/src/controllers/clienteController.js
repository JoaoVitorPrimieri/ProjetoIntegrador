const db = require("../config/database");
const VerificarEmpty = require("../validacoes/verificaEmpty");

exports.createClientes = async (req, res) => {
  const { clinome, cliemail, clicpf, clitelefone, cliendereco, clisexo } =
    req.body;
  const verificador = VerificarEmpty([
    { nome: "Nome", valor: clinome },
    { nome: "Email", valor: cliemail },
    { nome: "CPF", valor: clicpf },
    { nome: "Telefone", valor: clitelefone },
    { nome: "Endereço", valor: cliendereco },
    { nome: "Sexo", valor: clisexo },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const { rows } = await db.query(
      "INSERT INTO clientes (clinome, cliemail, clicpf, clitelefone, cliendereco, clisexo) VALUES ($1, $2, $3, $4, $5, $6)",
      [clinome, cliemail, clicpf, clitelefone, cliendereco, clisexo]
    );
    res.status(201).send({
      message: "Cliente adicionado com sucesso!",
      body: {
        clientes: {
          clinome,
          cliemail,
          clicpf,
          clitelefone,
          cliendereco,
          clisexo,
        },
      },
    });
  }
};

exports.listAllClientes = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM clientes ORDER BY clinome ASC"
  );
  res.status(200).send(response.rows);
};

exports.findClientesById = async (req, res) => {
  const cliid = parseInt(req.params.id);
  const response = await db.query("SELECT * FROM clientes WHERE cliid = $1", [
    cliid,
  ]);
  res.status(200).send(response.rows);
};

exports.updateClientesById = async (req, res) => {
  const cliid = parseInt(req.params.id);
  const { clinome, cliemail, clicpf, clitelefone, cliendereco, clisexo } =
    req.body;
  const verificador = VerificarEmpty([
    { nome: "Id", valor: cliid },
    { nome: "Nome", valor: clinome },
    { nome: "Email", valor: cliemail },
    { nome: "CPF", valor: clicpf },
    { nome: "Telefone", valor: clitelefone },
    { nome: "Endereço", valor: cliendereco },
    { nome: "Sexo", valor: clisexo },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const response = await db.query(
      "UPDATE clientes SET clinome = $1, cliemail = $2, clicpf = $3, clitelefone = $4, cliendereco = $5, clisexo = $6 WHERE cliid = $7",
      [clinome, cliemail, clicpf, clitelefone, cliendereco, clisexo, cliid]
    );

    res.status(200).send({ message: "Cliente editado com sucesso!" });
  }
};
exports.deleteClientesById = async (req, res) => {
  const cliid = parseInt(req.params.id);
  await db.query("DELETE FROM clientes WHERE cliid = $1", [cliid]);

  res.status(200).send({ message: "Cliente deleado com sucesso!", cliid });
};
