const express = require("express");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const morgan = require("morgan");
const mainRouter = require("./routes/index.js");
const cors = require("cors");


require("./db.js");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

// Configurar opciones de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Reemplaza con el origen exacto de tu aplicación
  credentials: true,
  methods: 'GET, POST, OPTIONS, PUT, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
};

server.use(cors(corsOptions));

server.use(mainRouter);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

