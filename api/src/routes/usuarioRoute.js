const router = require("express-promise-router")();

const usuarioController = require("../controllers/usuarioController");

router.post("/usuarios", usuarioController.createUsuarios);
router.get("/usuarios", usuarioController.listAllUsuarios);
router.get("/usuarios/:id", usuarioController.findUsuariosById);
router.put("/usuarios/:id", usuarioController.updateUsuariosById);
router.delete('/usuarios/:id', usuarioController.deleteUsuariosById);
module.exports = router;
