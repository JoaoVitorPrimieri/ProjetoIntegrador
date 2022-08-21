const router = require("express-promise-router")();

const agendamentoController = require("../controllers/agendamentoController");

router.post("/agendamentos", agendamentoController.createAgendamentos);
// router.get("/agendamentos", agendamentoController.listAllAgendamentos);
// router.get("/agendamentos/:id", agendamentoController.findAgendamentosById);
// router.put("/agendamentos/:id", agendamentoController.updateAgendamentosById);
// router.delete('/agendamentos/:id', agendamentoController.deleteAgendamentosById);
module.exports = router;
