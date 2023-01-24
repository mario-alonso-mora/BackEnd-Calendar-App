const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')




//!Crear el servidor de express
const app = express();

//!Base de Datos
dbConnection();

//! Cors
app.use(cors())



//!Directorio Publico

app.use(express.static('public'));


//!Lectura y parseo del body
app.use(express.json() )


//!Rutas

app.use('/api/auth',require('./routes/auth'));

app.use('/api/events',require('./routes/events'));

app.use('*',(req, resp) =>{

    resp.sendFile(__dirname + './public/index.html');

})



//TODO: CRUD:EVENTOS

//!Escuchar las peticiones
app.listen(process.env.PORT,()=>{
    console.log(`Servidor Corriendo en el puerto ${process.env.PORT}`);
});