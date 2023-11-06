const mongoose = require("mongoose");

const goodsSchema = new mongoose.Schema({
  goodsId: {
    //상품 번호
    type: Number,
    required: true,
    unique: true
  },
  goodsName: {
    //상품명
    type: Number,
    required: true
  },
  contents: {
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
    required: true
  },
  password: {
    //비밀번호
    type: String,
    required: true
  },
  createdDate: {
    //작성 날짜
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Goods", goodsSchema);
