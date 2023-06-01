const { Product, Category } = require("../db.js");

const dummyProductData = [
  {
    name: "mobile app expensive",
    description: "mobile app that allows you to perform multiple activities",
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quantity: 99,
    price: 129,
    categories: ["mobile"]
  },
  {
    name: "mobile app affordable",
    description:
      "affordable mobile app that allows you to perform multiple activities",
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quantity: 69,
    price: 99,
    categories: ["mobile"]
  },
  {
    name: "desktop app expensive",
    description: "desktop app that allows you to perform multiple activities",
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quantity: 140,
    price: 119,
    categories: ["desktop"]
  },
  {
    name: "desktop app affordable",
    description:
      "affordable desktop app that allows you to perform multiple activities",
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quantity: 30,
    price: 89,
    categories: ["desktop"]
  },
  {
    name: "web app expensive",
    description: "web app that allows you to perform multiple activities",
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quantity: 100,
    price: 99,
    categories: ["web"]
  },
  {
    name: "web app affordable",
    description:
      "affordable web app that allows you to perform multiple activities",
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quantity: 102,
    price: 59,
    categories: ["web"]
  },
];

const dummyCategoryData = [
  {
    name: "mobile",
  },
  {
    name: "desktop",
  },
  {
    name: "web",
  },
];

const seedDB = async () => {
  const seedProduct = dummyProductData.map((data) => {
    return {
      name: data.name,
      description: data.description,
      image: data.img,
      quantity: data.quantity,
      price: data.price,
    };

    
    
  });

  const seedCategory = dummyCategoryData.map((data) => {
    return {
      name: data.name,
    };
  });

  await Product.bulkCreate(seedProduct);
  await Category.bulkCreate(seedCategory);
  

};

module.exports = { seedDB };
