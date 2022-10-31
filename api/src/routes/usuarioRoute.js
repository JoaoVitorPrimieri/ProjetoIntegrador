const router = require("express-promise-router")();

const usuarioController = require("../controllers/usuarioController");

router.post("/usuarios", usuarioController.createUsuarios);
router.get("/usuarios", usuarioController.listAllUsuarios);
router.get("/usuarios/:id", usuarioController.findUsuariosById);
router.put("/usuarios/:id", usuarioController.updateUsuariosById);
router.delete("/usuarios/:id", usuarioController.deleteUsuariosById);
router.post("/usuario/login", usuarioController.login);
router.post("/usuario/logout", usuarioController.logout);
module.exports = router;
