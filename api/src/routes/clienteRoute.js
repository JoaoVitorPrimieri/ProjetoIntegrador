const router = require("express-promise-router")();

const clienteController = require("../controllers/clienteController");

router.post("/clientes", clienteController.createClientes);
router.get("/clientes", clienteController.listAllClientes);
router.get("/clientes/:id", clienteController.findClientesById);
router.put("/clientes/:id", clienteController.updateClientesById);
router.delete('/clientes/:id', clienteController.deleteClientesById);
module.exports = router;
