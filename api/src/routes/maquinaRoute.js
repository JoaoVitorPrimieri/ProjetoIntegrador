const router = require("express-promise-router")();

const maquinaController = require("../controllers/maquinaController");

router.post("/maquinas", maquinaController.createMaquinas);
router.get("/maquinas", maquinaController.listAllMaquinas);
router.get("/maquinas/:id", maquinaController.findMaquinasById);
router.put("/maquinas/:id", maquinaController.updateMaquinasById);
router.delete('/maquinas/:id', maquinaController.deleteMaquinasById);
module.exports = router;
