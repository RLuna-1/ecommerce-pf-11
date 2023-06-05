const { Router } = require("express");
const {  getAllPaymentHandlres,
  getPaymentByIdHandlres,
  createPaymentHandlres,
  updatePaymentHandlres,
  deletePaymentHandlres, } = require("../handlers/paymentHandlers");
const paymentsRouter = Router();

paymentsRouter.get("/",getAllPaymentHandlres);

paymentsRouter.get("/:id", getPaymentByIdHandlres);

paymentsRouter.post("/", createPaymentHandlres);

paymentsRouter.put("/:id", updatePaymentHandlres);

paymentsRouter.delete("/:id", deletePaymentHandlres);

module.exports = paymentsRouter;