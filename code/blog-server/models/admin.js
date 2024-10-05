const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  phone: { type: Number },
  role: { type: String },
  roles: [ObjectId],
});
const admin = mongoose.model("admin", adminSchema);

module.exports = {
  adminDB: admin,
};
