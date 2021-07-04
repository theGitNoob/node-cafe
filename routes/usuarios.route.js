const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios.controller");
const {
  validateRole,
  emailExist,
  existeUsuario,
} = require("../helpers/validators");

router = Router();

router.get(
  "/",
  [check("limit", "El limite no es un numero").isNumeric(), validarCampos],
  usuariosGet
);

router.post(
  "/",
  [
    check("name", "El Nombre es obligatorio").notEmpty(),
    check("email", "El correo no es válido").isEmail(),
    check("password", "La contraseña debe tener mas de 6 letras").isLength({
      min: 6,
    }),
    // check("role", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(validateRole),
    check("email").custom(emailExist),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuario),
    check("role").custom(validateRole),
    validarCampos,
  ],
  usuariosPut
);

router.patch("/", usuariosPatch);

router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuario),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
