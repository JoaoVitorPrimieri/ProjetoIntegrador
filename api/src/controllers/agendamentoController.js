const db = require("../config/database");

exports.createAgendamentos = async (req, res) => {
    const { agdData, agdFuncionario, agdServico, agdUsuario, agdCliente, agdqtdHoras, agdValorTotal } = req.body;
    const { rows } = await db.query(
      "INSERT INTO agendamentos (agdData, agdFuncionario, agdServico, agdUsuario, agdCliente, agdqtdHoras, agdValorTotal) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [agdData, agdFuncionario, agdServico, agdUsuario, agdCliente, agdqtdHoras, agdValorTotal]
    );
    res.status(201).send({
      message: "Agendamento adicionado com sucesso!",
      body: {
        agendamentos: { agdData, agdFuncionario, agdServico, agdUsuario, agdCliente, agdqtdHoras, agdValorTotal  }
      },
    });
  };

//   exports.listAllServicos = async (req, res) => {
//     const response = await db.query('SELECT * FROM servicos ORDER BY serNome ASC');
//     res.status(200).send(response.rows);
//   };

//   exports.findServicosById = async (req, res) => {
//     const serid = parseInt(req.params.id);
//     const response = await db.query('SELECT * FROM servicos WHERE serid = $1', [serid]);
//     res.status(200).send(response.rows);
//   }


//   exports.updateServicosById = async (req, res) => {
//     const serid = parseInt(req.params.id);
//     const { serNome, serValorServicoBase, serMaquinaId } = req.body;
  
//     const response = await db.query(
//       "UPDATE servicos SET serNome = $1, serValorServicoBase = $2, serMaquinaId = $3 WHERE serid = $4",
//       [serNome, serValorServicoBase, serMaquinaId, serid]
//     );
  
//     res.status(200).send({ message: "Serviço editado com sucesso!" });
//   };

//   exports.deleteServicosById = async (req, res) => {
//     const serid = parseInt(req.params.id);
//     await db.query('DELETE FROM servicos WHERE serid = $1', [
//         serid
//     ]);
  
//     res.status(200).send({ message: 'Serviço deleado com sucesso!', serid });
//   };