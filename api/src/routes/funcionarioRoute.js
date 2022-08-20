const router = require("express-promise-router")();

const funcionarioController = require("../controllers/funcionarioController");

router.post("/funcionarios", funcionarioController.createFuncionarios);
router.get("/funcionarios", funcionarioController.listAllFuncionarios);
router.get("/funcionarios/:id", funcionarioController.findFuncionariosById);
router.put("/funcionarios/:id", funcionarioController.updateFuncionariosById);
router.delete('/funcionarios/:id', funcionarioController.deleteFuncionariosById);
module.exports = router;
