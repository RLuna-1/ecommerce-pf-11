const { Router } = require("express");
const mercadopago = require("mercadopago");
const router = Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Transaccion } = require("../db"); 

mercadopago.configure({ access_token: process.env.MERCADOPAGO_KEY });

router.post("/", (req, res) => {
  const prod = req.body;
  let preference = {
    items: [],
    back_urls: {
      success: "https://ecommers-front-rust.vercel.app/home",
      failure: "https://ecommers-front-rust.vercel.app/home",
      pending: "https://ecommers-front-rust.vercel.app/home",
    },
    auto_return: "approved",
    binary_mode: true,
  };

  if (Array.isArray(prod)) {
    prod.forEach((item) => {
      preference.items.push({
        title: item.title,
        currency_id: "USD",
        quantity: item.quantity,
        price: item.price,
        unit_price: item.price,
      });
    });
  } else {
    preference.items.push({
      title: prod.title,
      currency_id: "USD",
      quantity: prod.quantity,
      price: prod.price,
      unit_price: prod.price,
    });
  }

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      if (response.body.init_point) {
        
        Transaccion.create({
          monto_total: calcularMontoTotal(preference.items),
          items_vendidos: JSON.stringify(preference.items), 
          
        })
        .then((transaccion) => {
          res.json({
            init_point: response.body.init_point,
            transaccionId: transaccion.id, 
          });
        })
        .catch((error) => {
          res.status(500).send({ error: 'Error al guardar la transacción' });
        });
      } else {
        res.status(400).send({ error: 'No init_point found in the response' });
      }
    })
    .catch((error) => res.status(400).send({ error: error }));
});

router.get("/feedback", function (req, res) {
  const { payment_id, status, merchant_order_id } = req.query;

  res.json({
    Payment: payment_id,
    Status: status,
    MerchantOrder: merchant_order_id,
  });
});

module.exports = router;


function calcularMontoTotal(items) {
  let total = 0;
  items.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
}