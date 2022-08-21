const db = require("../config/database");

exports.createServicos = async (req, res) => {
    const { serNome, serValorServicoBase, serMaquinaId } = req.body;
    const { rows } = await db.query(
      "INSERT INTO servicos (serNome, serValorServicoBase, serMaquinaId) VALUES ($1, $2, $3)",
      [serNome, serValorServicoBase, serMaquinaId]
    );
    res.status(201).send({
      message: "Serviço adicionado com sucesso!",
      body: {
        servicos: { serNome, serValorServicoBase, serMaquinaId  }
      },
    });
  };

  exports.listAllServicos = async (req, res) => {
    const response = await db.query('SELECT * FROM servicos ORDER BY serNome ASC');
    res.status(200).send(response.rows);
  };

  exports.findServicosById = async (req, res) => {
    const serid = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM servicos WHERE serid = $1', [serid]);
    res.status(200).send(response.rows);
  }


  exports.updateServicosById = async (req, res) => {
    const serid = parseInt(req.params.id);
    const { serNome, serValorServicoBase, serMaquinaId } = req.body;
  
    const response = await db.query(
      "UPDATE servicos SET serNome = $1, serValorServicoBase = $2, serMaquinaId = $3 WHERE serid = $4",
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