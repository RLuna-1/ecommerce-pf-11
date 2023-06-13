const { Router } = require("express");
const mercadopago = require("mercadopago");
const router = Router();
require("dotenv").config();

mercadopago.configure({ access_token: process.env.MERCADOPAGO_KEY });

router.post("/", (req, res) => {
  const prod = req.body;
  let preference = {
    items: [],

    back_urls: {
      success: "https://ecommers-front-rust.vercel.app/purchase-success",
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
    .then((response) => res.status(201).send({ response }))
    .catch((error) => res.status(400).send({ error: error }));
});

router.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

module.exports = router;

