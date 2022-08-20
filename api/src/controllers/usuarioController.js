const db = require("../config/database");

exports.createUsuarios = async (req, res) => {
    const { usuNome, usuSobrenome, usuCpf, usuTelefone, usuEndereco, usuSexo, usuSenha } = req.body;
    const { rows } = await db.query(
      "INSERT INTO usuarios (usuNome, usuSobrenome, usuCpf, usuTelefone, usuEndereco, usuSexo, usuSenha) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [usuNome, usuSobrenome, usuCpf, usuTelefone, usuEndereco, usuSexo, usuSenha]
    );
    res.status(201).send({
      message: "Usuario adicionado com sucesso!",
      body: {
        usuarios: { usuNome, usuSobrenome, usuCpf, usuTelefone, usuEndereco, usuSexo, usuSenha }
      },
    });
  };

  exports.listAllUsuarios = async (req, res) => {
    const response = await db.query('SELECT * FROM usuarios ORDER BY usuNome ASC');
    res.status(200).send(response.rows);
  };

  exports.findUsuariosById = async (req, res) => {
    const usuid = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM usuarios WHERE usuid = $1', [usuid]);
    res.status(200).send(response.rows);
  }


  exports.updateUsuariosById = async (req, res) => {
    const usuid = parseInt(req.params.id);
    const { usuNome, usuSobrenome, usuCpf, usuTelefone, usuEndereco, usuSexo, usuSenha } = req.body;
  
    const response = await db.query(
      "UPDATE usuarios SET usuNome = $1, usuSobrenome = $2, usuCpf = $3, usuTelefone = $4, usuEndereco = $5, usuSexo = $6, usuSenha = $7 WHERE usuid = $8",
      [usuNome, usuSobrenome, usuCpf, usuTelefone, usuEndereco, usuSexo, usuSenha, usuid]
    );
  
    res.status(200).send({ message: "Usuario editao com sucesso!" });
  };

  exports.deleteUsuariosById = async (req, res) => {
    const usuid = parseInt(req.params.id);
    await db.query('DELETE FROM usuarios WHERE usuid = $1', [
      usuid
    ]);
  
    res.status(200).send({ message: 'Usuario deleado com sucesso!', usuid });
  };