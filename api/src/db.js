require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  Carrito,
  Categoria,
  DetalleVenta,
  Pago,
  Pedido,
  Producto,
  RatingProducto,
  Transaccion,
  User,
  Venta,
} = sequelize.models;

RatingProducto.belongsTo(User); // Relación uno a muchos con User
RatingProducto.belongsTo(Producto); // Relación uno a muchos con Producto

User.hasMany(Pedido); // Relación uno a muchos con Pedido
User.hasOne(Carrito); // Relación uno a uno con Carrito
User.belongsToMany(Producto, { through: 'Wishlist' }); // Relación muchos a muchos con Producto a través de Wishlist

Transaccion.belongsTo(Pago); // Relación uno a uno con Pago
Transaccion.belongsTo(User); // Relación uno a muchos con User
Transaccion.belongsTo(Pago); // Relación uno a uno con Pago

Producto.belongsToMany(Categoria, { through: 'ProductoCategoria' }); // Relación muchos a muchos con Categoria a través de ProductoCategoria
Producto.hasMany(DetalleVenta); // Relación uno a muchos con DetalleVenta
Producto.belongsToMany(User, { through: 'Wishlist' }); // Relación muchos a muchos con User a través de Wishlist

Pedido.belongsTo(User); // Relación uno a muchos con User
Pedido.hasMany(DetalleVenta); // Relación uno a muchos con DetalleVenta
Pedido.belongsTo(Pago); // Relación uno a uno con Pago

Carrito.belongsTo(User); // Relación uno a uno con User
Carrito.hasMany(DetalleVenta); // Relación uno a muchos con DetalleVenta

Venta.belongsTo(User); // Relación uno a muchos con User
Venta.hasMany(DetalleVenta); // Relación uno a muchos con DetalleVenta
Venta.belongsTo(Pago); // Relación uno a uno con Pago

DetalleVenta.belongsTo(Venta); // Relación uno a muchos con Venta
DetalleVenta.belongsTo(Producto); // Relación uno a muchos con Producto

Categoria.belongsToMany(Producto, { through: 'ProductoCategoria' }); // Relación muchos a muchos con Producto a través de ProductoCategoria

Pago.belongsTo(Venta); // Relación uno a uno con Venta




module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
