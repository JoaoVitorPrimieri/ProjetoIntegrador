const db = require("../config/database");
const VerificarEmpty = require("../validacoes/verificaEmpty");

exports.createClientes = async (req, res) => {
  const { cliNome, cliSobrenome, cliCpf, cliTelefone, cliEndereco, cliSexo } =
    req.body;
  const verificador = VerificarEmpty([
    { nome: "Nome", valor: cliNome },
    { nome: "Sobrenome", valor: cliSobrenome },
    { nome: "CPF", valor: cliCpf },
    { nome: "Telefone", valor: cliTelefone },
    { nome: "Endereço", valor: cliEndereco },
    { nome: "Sexo", valor: cliSexo },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const { rows } = await db.query(
      "INSERT INTO clientes (cliNome, cliSobrenome, cliCpf, cliTelefone, cliEndereco, cliSexo) VALUES ($1, $2, $3, $4, $5, $6)",
      [cliNome, cliSobrenome, cliCpf, cliTelefone, cliEndereco, cliSexo]
    );
    res.status(201).send({
      message: "Cliente adicionado com sucesso!",
      body: {
        clientes: {
          cliNome,
          cliSobrenome,
          cliCpf,
          cliTelefone,
          cliEndereco,
          cliSexo,
        },
      },
    });
  }
};

exports.listAllClientes = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM clientes ORDER BY cliNome ASC"
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
  const { cliNome, cliSobrenome, cliCpf, cliTelefone, cliEndereco, cliSexo } =
    req.body;
    const verificador = VerificarEmpty([
      { nome: "Id", valor: cliid },
      { nome: "Nome", valor: cliNome },
      { nome: "Sobrenome", valor: cliSobrenome },
      { nome: "CPF", valor: cliCpf },
      { nome: "Telefone", valor: cliTelefone },
      { nome: "Endereço", valor: cliEndereco },
      { nome: "Sexo", valor: cliSexo },
    ]);
    if (verificador) {
      res.status(500).send({
        message: verificador,
      });
    } else {
  const response = await db.query(
    "UPDATE clientes SET cliNome = $1, cliSobrenome = $2, cliCpf = $3, cliTelefone = $4, cliEndereco = $5, cliSexo = $6 WHERE cliid = $7",
    [cliNome, cliSobrenome, cliCpf, cliTelefone, cliEndereco, cliSexo, cliid]
  );
  
  res.status(200).send({ message: "Cliente editado com sucesso!" });
};
};
exports.deleteClientesById = async (req, res) => {
  const cliid = parseInt(req.params.id);
  await db.query("DELETE FROM clientes WHERE cliid = $1", [cliid]);

  res.status(200).send({ message: "Cliente deleado com sucesso!", cliid });
};
