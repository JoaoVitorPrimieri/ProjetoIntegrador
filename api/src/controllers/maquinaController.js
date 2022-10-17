const db = require("../config/database");
const VerificarEmpty = require("../validacoes/verificaEmpty");
const VerificarNumber = require("../validacoes/verificaNumber");

exports.createMaquinas = async (req, res) => {
  const {
    maqmodelo,
    maqmarca,
    maqtipocombustivel,
    maqanofabricacao,
    maqnmrchassi,
  } = req.body;

  const verificador = VerificarEmpty([
    { nome: "Modelo", valor: maqmodelo },
    { nome: "Marca", valor: maqmarca },
    { nome: "Tipo do Combustivel", valor: maqtipocombustivel },
    { nome: "Ano de Fabricação", valor: maqanofabricacao },
    { nome: "Número do chassi", valor: maqnmrchassi },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const { rows } = await db.query(
      "INSERT INTO maquinas (maqmodelo, maqmarca, maqtipocombustivel, maqanofabricacao, maqnmrchassi) VALUES ($1, $2, $3, $4, $5)",
      [maqmodelo, maqmarca, maqtipocombustivel, maqanofabricacao, maqnmrchassi]
    );
    res.status(201).send({
      message: "Maquina adicionada com sucesso!",
      body: {
        maquinas: {
          maqmodelo,
          maqmarca,
          maqtipocombustivel,
          maqanofabricacao,
          maqnmrchassi,
        },
      },
    });
  }
};
exports.listAllMaquinas = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM maquinas ORDER BY maqmarca ASC"
  );
  res.status(200).send(response.rows);
};

exports.findMaquinasById = async (req, res) => {
  const maqid = parseInt(req.params.id);
  const response = await db.query("SELECT * FROM maquinas WHERE maqid = $1", [
    maqid,
  ]);
  res.status(200).send(response.rows);
};

exports.updateMaquinasById = async (req, res) => {
  const maqid = parseInt(req.params.id);
  const {
    maqmodelo,
    maqmarca,
    maqtipocombustivel,
    maqanofabricacao,
    maqnmrchassi,
  } = req.body;

  const verificador = VerificarEmpty([
    { nome: "Id", valor: maqid },
    { nome: "Modelo", valor: maqmodelo },
    { nome: "Marca", valor: maqmarca },
    { nome: "Tipo do Combustivel", valor: maqtipocombustivel },
    { nome: "Ano de Fabricação", valor: maqanofabricacao },
    { nome: "Número do chassi", valor: maqnmrchassi },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const response = await db.query(
      "UPDATE maquinas SET maqmodelo = $1, maqmarca = $2, maqtipocombustivel = $3, maqanofabricacao = $4, maqnmrchassi = $5 WHERE maqid = $6",
      [
        maqmodelo,
        maqmarca,
        maqtipocombustivel,
        maqanofabricacao,
        maqnmrchassi,
        maqid,
      ]
    );
  }
  res.status(200).send({ message: "Maquina editada com sucesso!" });
};

exports.deleteMaquinasById = async (req, res) => {
  const maqid = parseInt(req.params.id);
  await db.query("DELETE FROM maquinas WHERE maqid = $1", [maqid]);

  res.status(200).send({ message: "Maquina deletada com sucesso!", maqid });
};
