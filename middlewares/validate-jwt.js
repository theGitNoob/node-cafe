const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ msg: "No hay token en la petición" });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await userModel.findById(uid);

    if (!user || !user.state) {
      res.status(401).json({ msg: "Token no válido" });
    }

    req.user = user;

    return next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "Token no válido" });
  }
};

module.exports = {
  validateJWT,
};
