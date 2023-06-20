const express = require("express");
const nodemailerRouter = express.Router();
const nodemailer = require("nodemailer");
const { User } = require("../db");
require("dotenv").config();
const crypto = require("crypto");


function generateConfirmationToken() {
  const token = crypto.randomBytes(20).toString("hex");
  return token;
}


nodemailerRouter.post("/send-confirmation-email", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    if (user.confirmed) {
      return res.status(400).json({ message: "El usuario ya está confirmado" });
    }

    const confirmationToken = generateConfirmationToken();

    await user.update({ confirmationToken, confirmed: false });

    const confirmationLink = `https://ecommers-front-rust.vercel.app/confirm/${confirmationToken}`;

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.OUTLOOK_USERNAME,
        pass: process.env.OUTLOOK_PASSWORD,
      },
    });


    const mailOptions = {
      from: process.env.OUTLOOK_USERNAME,
      to: email,
      subject: "Confirmación de registro",
      text: `Por favor, haz clic en el siguiente enlace para confirmar tu registro: ${confirmationLink}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "El correo de confirmación ha sido enviado" });
  } catch (error) {
    console.error("Error al enviar el correo de confirmación:", error);
    return res.status(500).json({ message: "Ocurrió un error al enviar el correo de confirmación" });
  }
});


nodemailerRouter.get("/confirm/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ where: { confirmationToken: token } });
    if (!user) {
      return res.status(400).json({ message: "Token de confirmación inválido" });
    }

    await user.update({ confirmed: true });

    return res.redirect("https://ecommers-front-rust.vercel.app/home");
  } catch (error) {
    console.error("Error al confirmar el usuario:", error);
    return res.status(500).json({ message: "Ocurrió un error al confirmar el usuario" });
  }
});

module.exports = nodemailerRouter;
