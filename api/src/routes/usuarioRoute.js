const router = require('express-promise-router')();

const usuarioController = require('../controllers/usuarioController');

router.post('/usuarios', usuarioController.createUsuarios);
router.get('/usuarios', usuarioController.listAllUsuarios);
router.get('/usuarios/:id', usuarioController.findUsuariosById);

module.exports = router;
