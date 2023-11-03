const express = require("express");
const app = express();
const port = 3000;
const connect = require("./schemas");

const goodsRouter = require("./routes/goods.js");

app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("기본 URL에 POST 메소드가 정상적으로 반환되었습니다.");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/:id", (req, res) => {
  console.log(req.params);
  res.send(":id URL에 정상적으로 반환되었습니다");
});

app.use("/api", [goodsRouter]);

connect();
