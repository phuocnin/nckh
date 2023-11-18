const app = require("./app.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
//config dotenv
dotenv.config();
const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect DB oke!");
  });

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
