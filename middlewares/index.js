const validarCampos = require("../middlewares/validar-campos");
const validateJWT = require("../middlewares/validate-jwt");
const validarRoles = require("../middlewares/validar-roles");

module.exports = {
  ...validarCampos,
  ...validateJWT,
  ...validarRoles,
};
