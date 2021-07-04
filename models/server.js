const express = require("express");
const cors = require("cors");

const router = require("../routes/usuarios.route");
const { dbConnection } = require("../db/config");
const { request, response } = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //Conectar a base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y Parseo del body
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    //Directorio Público
    this.app.use(express.static("./public"));
  }

  routes() {
    this.app.use(this.usuariosPath, router);

    this.app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running at port: ", this.port);
    });
  }
}

module.exports = Server;
