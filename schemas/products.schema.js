const mongoose = require("mongoose");

const goodsSchema = new mongoose.Schema(
  {
    _id: {
      //상품 번호
      type: Number,
      required: true,
      unique: true
    },
    title: {
      //상품명
      type: Number,
      required: true
    },
    content: {
      //작성 내용
      type: String,
      required: true
    },
    author: {
      //작성자명
      type: String,
      required: true
    },
    status: {
      //상태
      type: String,
      enum: ["FOR_SALE", "SOLD_OUT"],
      default: "FOR_SALE"
    },
    password: {
      //비밀번호
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goods", goodsSchema);
