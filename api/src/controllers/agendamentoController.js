const db = require("../config/database");
const VerificarEmpty = require("../validacoes/verificaEmpty");

exports.createAgendamentos = async (req, res) => {
  const {
    agddata,
    agdfuncionario,
    agdservico,
    agdusuario,
    agdcliente,
    agdqtdhoras,
  } = req.body;

  const verificador = VerificarEmpty([
    { nome: "Data", valor: agddata },
    { nome: "Funcionário", valor: agdfuncionario },
    { nome: "Serviço", valor: agdservico },
    { nome: "Usuário", valor: agdusuario },
    { nome: "Cliente", valor: agdcliente },
    { nome: "Quantidade de Horas", valor: agdqtdhoras },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    //Calculo do serviço
    const servico = await db.query("SELECT * FROM servicos WHERE serid = $1", [
      agdservico,
    ]);
    const agdvalortotal = servico.rows[0].servalorservicobase * agdqtdhoras;
    const { rows } = await db.query(
      "INSERT INTO agendamentos (agddata, agdfuncionario, agdservico, agdusuario, agdcliente, agdqtdhoras, agdvalortotal) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        agddata,
        agdfuncionario,
        agdservico,
        agdusuario,
        agdcliente,
        agdqtdhoras,
        agdvalortotal,
      ]
    );

    res.status(201).send({
      message: "Agendamento adicionado com sucesso!",
      body: {
        agendamentos: {
          agddata,
          agdfuncionario,
          agdservico,
          agdusuario,
          agdcliente,
          agdqtdhoras,
          agdvalortotal,
        },
      },
    });
  }
};
exports.listAllAgendamentos = async (req, res) => {
  const response = await db.query(
    "SELECT agendamentos.agdid, agendamentos.agddata, funcionarios.funNome as agdfun, servicos.serNome as agdser, usuarios.usuNome as agdusu, clientes.cliNome as agdcli, agendamentos.agdfuncionario, agendamentos.agdservico, agendamentos.agdusuario, agendamentos.agdcliente, agendamentos.agdqtdhoras, agendamentos.agdvalortotal " +
      "FROM agendamentos " +
      "inner join funcionarios on agendamentos.agdfuncionario = funcionarios.funid " +
      "inner join servicos on agendamentos.agdservico = servicos.serid " +
      "inner join usuarios on agendamentos.agdusuario = usuarios.usuid " +
      "inner join clientes on agendamentos.agdcliente = clientes.cliid "
  );
  res.status(200).send(response.rows);
};

exports.findAgendamentosById = async (req, res) => {
  const agdid = parseInt(req.params.id);
  const response = await db.query(
    "SELECT * FROM agendamentos WHERE agdid = $1",
    [agdid]
  );
  //   if(agdid === null){
  //     res.status(500).send({
  //       message: "Id não encontrado",
  //     });} else {
  res.status(200).send(response.rows);
  // };
};

exports.updateAgendamentosById = async (req, res) => {
  const agdid = parseInt(req.params.id);
  const {
    agddata,
    agdfuncionario,
    agdservico,
    agdusuario,
    agdcliente,
    agdqtdhoras,
  } = req.body;
  const verificador = VerificarEmpty([
    { nome: "Data", valor: agddata },
    { nome: "Funcionário", valor: agdfuncionario },
    { nome: "Serviço", valor: agdservico },
    { nome: "Usuário", valor: agdusuario },
    { nome: "Cliente", valor: agdcliente },
    { nome: "Quantidade de Horas", valor: agdqtdhoras },
  ]);
  if (verificador) {
    res.status(500).send({
      message: verificador,
    });
  } else {
    const response = await db.query(
      "UPDATE agendamentos SET agddata = $1, agdfuncionario = $2, agdservico = $3, agdusuario = $4, agdcliente = $5, agdqtdhoras = $6 WHERE agdid = $7",
      [
        agddata,
        agdfuncionario,
        agdservico,
        agdusuario,
        agdcliente,
        agdqtdhoras,
        agdid,
      ]
    );

    res.status(200).send({ message: "Agendamento editado com sucesso!" });
  }
};

exports.deleteAgendamentosById = async (req, res) => {
  const agdid = parseInt(req.params.id);
  await db.query("DELETE FROM agendamentos WHERE agdid = $1", [agdid]);

  res.status(200).send({
    message: "Agendamento deletado com sucesso!",
    agdid,
  });
};
