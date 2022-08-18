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