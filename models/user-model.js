const { Schema, model } = require("mongoose");

let userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String },
  role: { type: String, required: true, enum: ["ADMIN_ROLE", "USER_ROLE"] },
  state: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};
let userModel = model("User", userSchema);

module.exports = userModel;
