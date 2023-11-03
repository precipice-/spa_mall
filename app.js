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
  console.log(req.query);
  const obj = {
    key: "이름",
    age: "20",
  };
  res.json(obj);
});

app.get("/:id", (req, res) => {
  console.log(req.params);
  res.send(":id URL에 정상적으로 반환되었습니다");
});

app.use("/api", [goodsRouter]);

connect();
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
