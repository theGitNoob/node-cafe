const express = require("express");
const cors = require("cors");

const router = require("../routes/usuarios.route");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicación
    this.routes();
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
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running at port: ", this.port);
    });
  }
}

module.exports = Server;
