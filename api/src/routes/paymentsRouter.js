const { Router } = require("express");
const { getAllPaymentsHandlres, getPaymentsByIdHandlres, createPaymentsHandlres, updatePaymentsHandlres, deletePaymentsHandlres } = require("../handlers/paymentshandlers");

const paymentsRouter = Router();

paymentsRouter.get("/",getAllPaymentsHandlres);

paymentsRouter.get("/:id", getPaymentsByIdHandlres);

paymentsRouter.post("/", createPaymentsHandlres);

paymentsRouter.put("/:id", updatePaymentsHandlres);

paymentsRouter.delete("/:id", deletePaymentsHandlres);

module.exports = paymentsRouter;