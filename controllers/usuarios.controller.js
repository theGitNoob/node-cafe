const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const { validationResult } = require("express-validator");

const usuariosGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true }).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({ total, users });
};

const usuariosPost = async (req = request, res = response, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...resto } = req.body;

  //TODO validar contra BD
  if (password) {
    const salt = await bcrypt.genSalt(10);
    resto.password = await bcrypt.hash(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto);

  res.status(400).json(user);
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { state: false });

  return res.json(user);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
