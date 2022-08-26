const db = require("../config/database");
const VerificarEmpty = require("../validacoes/verificaEmpty");

exports.createAgendamentos = async (req, res) => {
    const { agdData, agdFuncionario, agdServico, agdUsuario, agdCliente, agdqtdHoras } = req.body;
   
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
      
      //A PARTIR DAQUI FOI O BEAL
      const servico = await db.query("SELECT * FROM servicos WHERE serid = $1", [
        agdServico,
      ]);
      const agdValorTotal = servico.rows[0].servalorservicobase * agdqtdHoras;
    const { rows } = await db.query(
      "INSERT INTO agendamentos (agdData, agdFuncionario, agdServico, agdUsuario, agdCliente, agdqtdHoras, agdValorTotal) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [agdData, agdFuncionario, agdServico, agdUsuario, agdCliente, agdqtdHoras, agdValorTotal]
    );
    //AAAAAAAAAAAAAAAAA_____________________________________________        
    res.status(201).send({
      message: "Agendamento adicionado com sucesso!",
      body: {
        agendamentos: { agdData, agdFuncionario, agdServico, agdUsuario, agdCliente, agdqtdHoras, agdValorTotal  }
      },
    });
  };
};
  exports.listAllServicos = async (req, res) => {
    const response = await db.query('SELECT * FROM agendamentos ORDER BY agdData ASC');
    res.status(200).send(response.rows);
  };

  exports.findServicosById = async (req, res) => {
    const agdid = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM agendamentos WHERE agdid = $1', [agdid]);
    res.status(200).send(response.rows);
  }


  exports.updateServicosById = async (req, res) => {
    const serid = parseInt(req.params.id);
    const { agdData, agdFuncionario, agdServico, agdUsuario, agdCliente, agdqtdHoras, agdValorTotal } = req.body;
  
    const response = await db.query(
      "UPDATE agendamento SET agdData = $1, agdFuncionario = $2, agdServico = $3 WHERE serid = $4",
      [serNome, serValorServicoBase, serMaquinaId, serid]
    );
  
    res.status(200).send({ message: "Serviço editado com sucesso!" });
  };

  exports.deleteServicosById = async (req, res) => {
    const serid = parseInt(req.params.id);
    await db.query('DELETE FROM servicos WHERE serid = $1', [
        serid
    ]);
  
    res.status(200).send({ message: 'Serviço deleado com sucesso!', serid });
  };