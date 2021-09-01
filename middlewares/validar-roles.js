const isAdminRole = (req, res, next) => {
  if (!req.user) {
    return res
      .status(500)
      .json({ msg: "Se quire verificar el role sin validar el token primero" });
  }
  const { role } = req.user;

  if (role !== "ADMIN_ROLE") {
    res.status(401).json({ msg: "Token no válido" });
  }

  return next();
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles: ${roles}`,
      });
    }

    return next;
  };
};
module.exports = { isAdminRole, hasRole };
