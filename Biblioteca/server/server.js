require('./config/config');
const express = require('express'); //LIBRERIA CREAR APLICACIONES WEB DEL LADO DEL SERVIDOR
const mongoose = require('mongoose'); //LIBRERIA PARA CONECTARNOS A LA BASE DE DATOS MONGO

const app = express();
const cors = require('cors');

const bodyParser = require('body-parser') //parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) //parse application/json
app.use(bodyParser.json())


//CONEXION A LA BASE DE DATOS EN LA NUBE CONECTAR MONGO
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

//CONFIGURACION CORS
// No usar para ambientes de producción, restringir a dominios especificos
app.use(cors({
    origin: '*'
}));


//CONFIGURACION DEL PUERTO
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto 3000:', process.env.PORT);
});


//CONFIGURACION GLOBAL DE RUTAS
app.use(require('./routes/index'));