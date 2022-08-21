const router = require("express-promise-router")();

const servicoController = require("../controllers/servicoController");

router.post("/servicos", servicoController.createServicos);
router.get("/servicos", servicoController.listAllServicos);
router.get("/servicos/:id", servicoController.findServicosById);
router.put("/servicos/:id", servicoController.updateServicosById);
router.delete('/servicos/:id', servicoController.deleteServicosById);
module.exports = router;
