const { Router } = require("express");
const { DetallesVentas } = require("../db");
const salesRouter = Router();

salesRouter.get("/", (req, res) => {
  DetallesVentas.findAll() 
    .then((sales) => {
      res.status(200).json(sales);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al obtener las ventas" });
    });
});

salesRouter.get("/:id", (req, res) => {
  const saleId = req.params.id;
  DetallesVentas.findByPk(saleId)
    .then((sale) => {
      if (sale) {
        res.status(200).json(sale);
      } else {
        res.status(404).json({ message: "Venta no encontrada" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al obtener la venta" });
    });
});

salesRouter.post("/", (req, res) => {
  const { producto, precio, cantidad, metodoPago } = req.body;
  DetallesVentas.create({ producto, precio, cantidad, metodoPago })
    .then((newSale) => {
      res.status(201).json(newSale);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al crear la venta" });
    });
});




salesRouter.put("/:id", (req, res) => {
  const saleId = req.params.id;
  const { name, price } = req.body;
  DetallesVentas.update({ name, price }, { where: { id: saleId } }) 
    .then((result) => {
      if (result[0] === 1) {
        res.status(200).json({ message: "Venta actualizada" });
      } else {
        res.status(404).json({ message: "Venta no encontrada" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al actualizar la venta" });
    });
});

salesRouter.delete("/:id", (req, res) => {
  const saleId = req.params.id;
  DetallesVentas.destroy({ where: { id: saleId } })
    .then((result) => {
      if (result === 1) {
        res.status(200).json({ message: "Venta eliminada" });
      } else {
        res.status(404).json({ message: "Venta no encontrada" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al eliminar la venta" });
    });
});

module.exports = salesRouter;
