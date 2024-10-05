const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

// 定义角色 Schema
const roleSchema = new mongoose.Schema({
  _id: ObjectId,
  name: { type: String, required: true },
  a_id: [ObjectId],
  menusItemsIdChildren: [ObjectId],
});

// 创建项模型
const roleDB = mongoose.model("role", roleSchema);

module.exports = roleDB;
