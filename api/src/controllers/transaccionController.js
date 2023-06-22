const { Transaccion } = require("../db");

async function getAllTransacciones() {
    let transacciones = await Transaccion.findAll();
    return transacciones;
  }

  module.exports = {
    getAllTransacciones
  };