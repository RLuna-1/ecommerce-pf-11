const { Router } = require("express");
const mercadopago = require("mercadopago");
const router = Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");

mercadopago.configure({ access_token: process.env.MERCADOPAGO_KEY });

router.post("/", (req, res) => {
  const prod = req.body;
  let preference = {
    items: [],
    back_urls: {
      success: `https://ecommers-front-rust.vercel.app/home`,
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
        res.json({
          init_point: response.body.init_point,
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