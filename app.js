require("dotenv").config();
const express = require("express");
const connect = require("./schemas");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connect();

const goodsRouter = require("./routes/products.router.js");
app.use("/api", goodsRouter);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
