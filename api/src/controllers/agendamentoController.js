const db = require("../config/database");
const VerificarEmpty = require("../validacoes/verificaEmpty");

exports.createAgendamentos = async (req, res) => {
    const {
        agdData,
        agdFuncionario,
        agdServico,
        agdUsuario,
        agdCliente,
        agdqtdHoras,
    } = req.body;

    const verificador = VerificarEmpty([
        { nome: "Data", valor: agdData },
        { nome: "Funcionário", valor: agdFuncionario },
        { nome: "Serviço", valor: agdServico },
        { nome: "Usuário", valor: agdUsuario },
        { nome: "Cliente", valor: agdCliente },
        { nome: "Quantidade de Horas", valor: agdqtdHoras },
    ]);
    if (verificador) {
        res.status(500).send({
            message: verificador,
        });
    } else {
        //Calculo do serviço
        const servico = await db.query(
            "SELECT * FROM servicos WHERE serid = $1",
            [agdServico]
        );
        const agdValorTotal = servico.rows[0].servalorservicobase * agdqtdHoras;
        const { rows } = await db.query(
            "INSERT INTO agendamentos (agdData, agdFuncionario, agdServico, agdUsuario, agdCliente, agdqtdHoras, agdValorTotal) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [
                agdData,
                agdFuncionario,
                agdServico,
                agdUsuario,
                agdCliente,
                agdqtdHoras,
                agdValorTotal,
            ]
        );

        res.status(201).send({
            message: "Agendamento adicionado com sucesso!",
            body: {
                agendamentos: {
                    agdData,
                    agdFuncionario,
                    agdServico,
                    agdUsuario,
                    agdCliente,
                    agdqtdHoras,
                    agdValorTotal,
                },
            },
        });
    }
};
exports.listAllAgendamentos = async (req, res) => {
    const response = await db.query(
        "SELECT * FROM agendamentos ORDER BY agdData ASC"
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
        agdData,
        agdFuncionario,
        agdServico,
        agdUsuario,
        agdCliente,
        agdqtdHoras,
    } = req.body;
    const verificador = VerificarEmpty([
        { nome: "Data", valor: agdData },
        { nome: "Funcionário", valor: agdFuncionario },
        { nome: "Serviço", valor: agdServico },
        { nome: "Usuário", valor: agdUsuario },
        { nome: "Cliente", valor: agdCliente },
        { nome: "Quantidade de Horas", valor: agdqtdHoras },
      ]);
      if (verificador) {
        res.status(500).send({
          message: verificador,
        });
      } else {
    const response = await db.query(
        "UPDATE agendamentos SET agdData = $1, agdFuncionario = $2, agdServico = $3, agdUsuario = $4, agdCliente = $5, agdqtdHoras = $6 WHERE agdid = $7",
        [
            agdData,
            agdFuncionario,
            agdServico,
            agdUsuario,
            agdCliente,
            agdqtdHoras,
            agdid,
        ]
    );

    res.status(200).send({ message: "Agendamento editado com sucesso!" });
};
};

exports.deleteAgendamentosById = async (req, res) => {
    const agdid = parseInt(req.params.id);
    await db.query("DELETE FROM agendamentos WHERE agdid = $1", [agdid]);

    res.status(200).send({
        message: "Agendamento deletado com sucesso!",
        agdid,
    });
};
