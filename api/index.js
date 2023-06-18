const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { seedDB, seedReviews, seedUsers } = require("./src/utils/index.js");

conn.sync({ alter: true }).then(() => {
  server.listen(3001, () => {
    seedUsers()
    seedReviews()
    seedDB()
    console.log("%s listening at 3001"); 
  });
});