const db = require("../config/database");
const VerificarEmpty = require("../validacoes/verificaEmpty");

exports.createServicos = async (req, res) => {
  const { serNome, serValorServicoBase, serMaquinaId } = req.body;
  const verificador = VerificarEmpty([
    { nome: "Nome", valor: serNome },
    { nome: "Valor do serviço", valor: serValorServicoBase },
    { nome: "Id da maquina", valor: serMaquinaId },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const { rows } = await db.query(
      "INSERT INTO servicos (serNome, serValorServicoBase, serMaquinaId) VALUES ($1, $2, $3)",
      [serNome, serValorServicoBase, serMaquinaId]
    );
    res.status(201).send({
      message: "Serviço adicionado com sucesso!",
      body: {
        servicos: { serNome, serValorServicoBase, serMaquinaId },
      },
    });
  }
};
exports.listAllServicos = async (req, res) => {
  const response = await db.query(
    "SELECT servicos.serid,  servicos.sernome, servicos.servalorservicobase, maquinas.maqModelo as sermaquinaid " +
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
  const { serNome, serValorServicoBase, serMaquinaId } = req.body;
  const verificador = VerificarEmpty([
    { nome: "Id", valor: serid },
    { nome: "Nome", valor: serNome },
    { nome: "Valor do serviço", valor: serValorServicoBase },
    { nome: "Id da maquina", valor: serMaquinaId },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const response = await db.query(
      "UPDATE servicos SET serNome = $1, serValorServicoBase = $2, serMaquinaId = $3 WHERE serid = $4",
      [serNome, serValorServicoBase, serMaquinaId, serid]
    );

    res.status(200).send({ message: "Serviço editado com sucesso!" });
  }
};
exports.deleteServicosById = async (req, res) => {
  const serid = parseInt(req.params.id);
  await db.query("DELETE FROM servicos WHERE serid = $1", [serid]);

  res.status(200).send({ message: "Serviço deleado com sucesso!", serid });
};
