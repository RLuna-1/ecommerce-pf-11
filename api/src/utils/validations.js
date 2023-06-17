const validationGetProducts = async (req, res, next) => {
  let {
    name,
    quantity,
    quantitygte,
    quantitylte,
    price,
    pricegte,
    pricelte,
    categories,
    order,
    direction,
    page,
  } = req.query;

  //console.log(price);

  //console.log(price);

  const validationErrors = [];

  if (name && typeof name !== "string") {
    validationErrors.push("Name must be a string");
  }

  if (quantity && isNaN(quantity)) {
    validationErrors.push("Quantity must be a number");
  }

  if (quantitygte && isNaN(quantitygte)) {
    validationErrors.push("Quantitygte must be a number");
  }

  if (quantitylte && isNaN(quantitylte)) {
    validationErrors.push("Quantitylte must be a number");
  }

  if (price && isNaN(price)) {
    validationErrors.push("Price must be a number");
  }

  if (pricegte && isNaN(pricegte)) {
    validationErrors.push("Pricegte must be a number");
  }

  if (pricelte && isNaN(pricelte)) {
    validationErrors.push("Pricelte must be a number");
  }

  // if (categories && typeof categories !== "string") {
  //   validationErrors.push("Categories must be a string");
  // }

  if (
    order &&
    (typeof order !== "string" ||
      /\d/.test(order) ||
      (order !== "alphabetical" &&
        order !== "price" &&
        order !== "quantity" &&
        order !== "categories"))
  ) {
    validationErrors.push(
      "Order must be a string and either alphabetical, price, quantity or categories"
    );
  }

  if (
    direction &&
    (typeof direction !== "string" ||
      direction !== direction.toUpperCase() ||
      /\d/.test(direction))
  ) {
    validationErrors.push("Direction must be either ASC or DESC");
  }

  if (page && page <= 0) {
    validationErrors.push("Page must be a number greater than zero");
  }

  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  next();
};

module.exports = { validationGetProducts };
