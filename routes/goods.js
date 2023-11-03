const express = require("express"); // express라이브러리를 express 변수에 할당
const router = express.Router(); // 다시 express.Router()라는 함수를 실행시켜 router이라는 변수에 할당

const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

router.get("/goods/cart", async (req, res) => {
  const carts = await Cart.find({});

  const goodsIds = carts.map((cart) => {
    return cart.goodsId;
  });

  const goods = await Goods.find({ goodsId: goodsIds });

  const results = carts.map((cart) => {
    return {
      quantity: cart.quantity,
      goods: goods.find((item) => item.goodsId === cart.goodsId)
    };
  });
  res.json({
    carts: results
  });
});

router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 장바구니에 상품이 존재합니다."
    });
  }

  await Cart.create({ goodsId, quantity });

  res.json({ result: "success" });
});

router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price
  });

  res.json({ goods: createdGoods });
});

router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    res.status(400).json({ errorMessage: "수량은 1 이상이어야 합니다." });
    return;
  }

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
  }

  res.status(200).json({ success: true });
});

router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    await Cart.deleteOne({ goodsId });
  }
  res.json({ result: "success" });
});

//상품 목록 조회 API
router.get("/goods", (req, res) => {
  res.json({ goods: goods });
});
module.exports = router;
