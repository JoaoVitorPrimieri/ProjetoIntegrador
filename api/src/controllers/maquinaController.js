const db = require("../config/database");
const VerificarEmpty = require("../validacoes/verificaEmpty");
const VerificarNumber = require("../validacoes/verificaNumber");

exports.createMaquinas = async (req, res) => {
  const {
    maqModelo,
    maqMarca,
    maqTipoCombustivel,
    maqAnoFabricacao,
    maqnmrChassi,
  } = req.body;

  const verificador = VerificarEmpty([
    { nome: "Modelo", valor: maqModelo },
    { nome: "Marca", valor: maqMarca },
    { nome: "Tipo do Combustivel", valor: maqTipoCombustivel },
    { nome: "Ano de Fabricação", valor: maqAnoFabricacao },
    { nome: "Número do chassi", valor: maqnmrChassi },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const { rows } = await db.query(
      "INSERT INTO maquinas (maqModelo, maqMarca, maqTipoCombustivel, maqAnoFabricacao, maqnmrChassi) VALUES ($1, $2, $3, $4, $5)",
      [maqModelo, maqMarca, maqTipoCombustivel, maqAnoFabricacao, maqnmrChassi]
    );
    res.status(201).send({
      message: "Maquina adicionada com sucesso!",
      body: {
        maquinas: {
          maqModelo,
          maqMarca,
          maqTipoCombustivel,
          maqAnoFabricacao,
          maqnmrChassi,
        },
      },
    });
  }
};
exports.listAllMaquinas = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM maquinas ORDER BY maqMarca ASC"
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
    maqModelo,
    maqMarca,
    maqTipoCombustivel,
    maqAnoFabricacao,
    maqnmrChassi,
  } = req.body;

  const verificador = VerificarEmpty([
    { nome: "Id", valor: maqid },
    { nome: "Modelo", valor: maqModelo },
    { nome: "Marca", valor: maqMarca },
    { nome: "Tipo do Combustivel", valor: maqTipoCombustivel },
    { nome: "Ano de Fabricação", valor: maqAnoFabricacao },
    { nome: "Número do chassi", valor: maqnmrChassi },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const response = await db.query(
      "UPDATE maquinas SET maqModelo = $1, maqMarca = $2, maqTipoCombustivel = $3, maqAnoFabricacao = $4, maqnmrChassi = $5 WHERE maqid = $6",
      [
        maqModelo,
        maqMarca,
        maqTipoCombustivel,
        maqAnoFabricacao,
        maqnmrChassi,
        maqid,
      ]
    );
  }
  res.status(200).send({ message: "Maquina editada com sucesso!" });
};

exports.deleteMaquinasById = async (req, res) => {
  const maqid = parseInt(req.params.id);
  await db.query("DELETE FROM maquinas WHERE maqid = $1", [maqid]);

  res.status(200).send({ message: "Maquina deleada com sucesso!", maqid });
};
