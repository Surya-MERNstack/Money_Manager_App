const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// categories => field => ['type', 'color']
const categories_model = new Schema({
  type: { type: String },
  color: { type: String },
});

// transactions  => field => ['name', 'type', 'amount', 'date']
const transaction_model = new Schema({
  name: { type: String },
  type: { type: String },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
});

const UserRegister = new Schema({
  name: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Categories = mongoose.model("categories", categories_model);
const Transaction = mongoose.model("transaction", transaction_model);
const UserSchema = mongoose.model("UserData", UserRegister);

exports.default = Transaction;
module.exports = {
  Categories,
  Transaction,
  UserSchema,
};
