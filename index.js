// creacion de proyecto: npm init
// instalacion de paquetes: npm install --save express /despliegue
// instalacion de paquetes lado desarrollo: npm install --save-dev nodemon
// para instalar las dependencias desde el archivo package.json ejecutamos: npm install
// instalamos dependencia del proyecto para el motor de plantillas: npm install --save pug
// creacion de pagina maestra... layout

// paquete para conexion a bd mongodb: npm install --save mongoose
// paquetes para MySql: npm install --save mysql2 sequelize
// Seccion 11-33
//import express from 'express';
const express = require('express');
const routes = require('./routes');
const path = require('path');         // importamos paquete de rutas del entorno
const bodyParser = require('body-parser');

// Creacion de app de express
const app = express();

// Donde cargar los archivos estaticos
app.use(express.static('public'));

// habilitamos pug
app.set('view engine', 'pug');

// añadimos carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

// agregamos las rutas
app.use('/', routes());

app.listen(3000);

// engine template https://github.com/expressjs/express/wiki#templates-engines
