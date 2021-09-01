const jswt = require("jsonwebtoken");

const genJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jswt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("No se pudo generar el JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};
module.exports = {
  genJWT,
};
