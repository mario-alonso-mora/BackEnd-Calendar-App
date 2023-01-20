const mongoose = require("mongoose");
mongoose.set("strictQuery", true);


const dbConnection = async () => {
  

  try {

    await mongoose.connect(process.env.DB_CNN, {

      useNewUrlParser: true,
      useUnifiedTopology: true,

    });

    console.log("DB Connected");


  } catch (error) {

    console.log(error);

    throw new Error("Error a la hora de inicializar la Base de Datos");

  }
  

};

module.exports = {
  dbConnection,
};
