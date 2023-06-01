const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { seedDB } = require("./src/utils/index.js");

conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    seedDB()
    console.log("%s listening at 3001"); 
  });
});