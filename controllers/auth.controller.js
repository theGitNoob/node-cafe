const brcypt = require("bcryptjs");
const { genJWT } = require("../helpers/genJWT");
const userModel = require("../models/user-model");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Verificar si el email existe
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos" });
    }

    //Si el usuario esta activo
    if (!user.state) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos" });
    }

    //Verificar la contraseña

    const match = await brcypt.compare(password, user.password);

    if (!match) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos" });
    }

    //Generar el JWT
    const token = await genJWT(user.id);

    res.json({ msg: "Login ok", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};

module.exports = {
  login,
};
