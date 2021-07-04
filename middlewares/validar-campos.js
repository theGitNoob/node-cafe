const { request, response } = require("express");
const { validationResult } = require("express-validator");

require("express-validator");

const validarCampos = (req = response, res = request, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }
  next();
};

module.exports = { validarCampos };
