const db = require("../config/database");

exports.createFuncionarios = async (req, res) => {
    const { funNome, funSobrenome, funCpf, funTelefone, funEndereco, funSexo } = req.body;
    const { rows } = await db.query(
      "INSERT INTO funcionarios (funNome, funSobrenome, funCpf, funTelefone, funEndereco, funSexo) VALUES ($1, $2, $3, $4, $5, $6)",
      [funNome, funSobrenome, funCpf, funTelefone, funEndereco, funSexo]
    );
    res.status(201).send({
      message: "Funionario adicionado com sucesso!",
      body: {
        funcionarios: { funNome, funSobrenome, funCpf, funTelefone, funEndereco, funSexo }
      },
    });
  };

  exports.listAllFuncionarios = async (req, res) => {
    const response = await db.query('SELECT * FROM funcionarios ORDER BY funNome ASC');
    res.status(200).send(response.rows);
  };

  exports.findFuncionariosById = async (req, res) => {
    const funid = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM funcionarios WHERE funid = $1', [funid]);
    res.status(200).send(response.rows);
  }


  exports.updateFuncionariosById = async (req, res) => {
    const funid = parseInt(req.params.id);
    const { funNome, funSobrenome, funCpf, funTelefone, funEndereco, funSexo } = req.body;
  
    const response = await db.query(
      "UPDATE funcionarios SET funNome = $1, funSobrenome = $2, funCpf = $3, funTelefone = $4, funEndereco = $5, funSexo = $6 WHERE funid = $7",
      [funNome, funSobrenome, funCpf, funTelefone, funEndereco, funSexo, funid]
    );
  
    res.status(200).send({ message: "Funcionario editado com sucesso!" });
  };

  exports.deleteFuncionariosById = async (req, res) => {
    const funid = parseInt(req.params.id);
    await db.query('DELETE FROM funcionarios WHERE funid = $1', [
        funid
    ]);
  
    res.status(200).send({ message: 'Funcionario deleado com sucesso!', funid });
  };