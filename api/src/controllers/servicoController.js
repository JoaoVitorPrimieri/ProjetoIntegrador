const db = require("../config/database");
const VerificarEmpty = require("../validacoes/verificaEmpty");

exports.createServicos = async (req, res) => {
  const { sernome, servalorservicobase, sermaquinaid } = req.body;
  const verificador = VerificarEmpty([
    { nome: "Nome", valor: sernome },
    { nome: "Valor do serviço", valor: servalorservicobase },
    { nome: "Id da maquina", valor: sermaquinaid },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const { rows } = await db.query(
      "INSERT INTO servicos (sernome, servalorservicobase, sermaquinaid) VALUES ($1, $2, $3)",
      [sernome, servalorservicobase, sermaquinaid]
    );
    res.status(201).send({
      message: "Serviço adicionado com sucesso!",
      body: {
        servicos: { sernome, servalorservicobase, sermaquinaid },
      },
    });
  }
};
exports.listAllServicos = async (req, res) => {
  const response = await db.query(
    "SELECT servicos.serid,  servicos.sernome, servicos.servalorservicobase, maquinas.maqModelo as sermaquina, servicos.sermaquinaid " +
      "from servicos  inner join maquinas on servicos.sermaquinaid = maquinas.maqid"
  );
  res.status(200).send(response.rows);
};

exports.findServicosById = async (req, res) => {
  const serid = parseInt(req.params.id);
  const response = await db.query(
    "SELECT servicos.serid,  servicos.sernome, servicos.servalorservicobase, maquinas.maqModelo as sermaquinaid " +
      "from servicos  inner join maquinas on servicos.sermaquinaid = maquinas.maqid WHERE serid = $1",
    [serid]
  );
  res.status(200).send(response.rows);
};

exports.updateServicosById = async (req, res) => {
  const serid = parseInt(req.params.id);
  const { sernome, servalorservicobase, sermaquinaid } = req.body;
  const verificador = VerificarEmpty([
    { nome: "Id", valor: serid },
    { nome: "Nome", valor: sernome },
    { nome: "Valor do serviço", valor: servalorservicobase },
    { nome: "Id da maquina", valor: sermaquinaid },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const response = await db.query(
      "UPDATE servicos SET sernome = $1, servalorservicobase = $2, sermaquinaid = $3 WHERE serid = $4",
      [sernome, servalorservicobase, sermaquinaid, serid]
    );

    res.status(200).send({ message: "Serviço editado com sucesso!" });
  }
};
exports.deleteServicosById = async (req, res) => {
  const serid = parseInt(req.params.id);
  await db.query("DELETE FROM servicos WHERE serid = $1", [serid]);

  res.status(200).send({ message: "Serviço deleado com sucesso!", serid });
};
