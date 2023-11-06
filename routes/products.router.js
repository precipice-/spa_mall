const express = require("express"); // express라이브러리를 express 변수에 할당
const router = express.Router(); // 다시 express.Router()라는 함수를 실행시켜 router이라는 변수에 할당

const products = require("../schemas/products.schema.js");

// 상품 등록
router.post("/products", async (req, res) => {
  //const { goodsId } = req.params;
  const { title, content, author, password } = req.body;
  const product = await products.find({}).sort({ id: -1 });
  const goodsID = product.length === 0 ? 1 : Number(product[product.length].id) + 1;

  try {
    await products.create({
      title,
      content,
      author,
      password,
      goodsId: goodsID,
      status: "FOR_SALE",
      createdDate: new Date()
    });
    res.json({ message: "판매 상품을 등록하였습니다." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

// 상품 목록 조회
router.get("/products", async (req, res) => {
  const product = await products.find({}).sort({ id: -1 });
  res.json({ data: product });
});

// 상품 상세 조회
router.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await products.find({ id: productId });
    const result = product.map((data) => {
      return {
        goodsID: data.goodsId,
        title: data.title,
        content: data.content,
        author: data.author,
        status: data.status,
        createdDate: data.createdDate
      };
    });
    res.json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

// 상품 정보 수정
router.put("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { title, contents, password, status } = req.body;

  const existsProduct = await products.find({ id: productId });
  console.log(existsProduct);
  try {
    if (existsProduct.length) {
      if (existsProduct[0].password == password) {
        await products.updateOne({
          id: productId,
          $set: {
            title,
            content,
            status
          }
        });
        res.json({ message: "상품정보를 수정하였습니다." });
      } else {
        res.status(401).json({ message: "상품을 삭제할 권한이 존재하지 않습니다." });
      }
    } else {
      res.status(404).json({ message: "상품 조회에 실패하였습니다." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

// 상품 삭제
router.delete("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { password } = req.body;

  const existsProduct = await products.find({ id: productId });
  console.log(existsProduct);
  try {
    if (existsProduct.length) {
      if (existsProduct[0].password == password) {
        await products.deleteOne({ id: productId });
        res.json({ result: "success" });
      } else {
        res.status(401).json({ message: "상품을 삭제할 권한이 존재하지 않습니다." });
      }
    } else {
      res.status(404).json({ message: "상품 조회에 실패하였습니다." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

module.exports = router;
