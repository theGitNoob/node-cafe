const Role = require("../models/role.model");
const User = require("../models/user-model");

const validateRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

const emailExist = async (email = "") => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error(`El correo ya está registrado`);
  }
};

const existeUsuario = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`El usuario con id: ${id} no existe`);
  }
};

module.exports = {
  validateRole,
  emailExist,
  existeUsuario,
};
