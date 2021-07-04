const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    // throw new Error("Error al conectarse a la BD");
  }
};

module.exports = {
  dbConnection,
};
