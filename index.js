// creacion de proyecto: npm init
// instalacion de paquetes: npm install --save express /despliegue
// instalacion de paquetes lado desarrollo: npm install --save-dev nodemon
// para instalar las dependencias desde el archivo package.json ejecutamos: npm install
// instalamos dependencia del proyecto para el motor de plantillas: npm install --save pug
// creacion de pagina maestra... layout

// paquete para conexion a bd mongodb: npm install --save mongoose
// paquetes para MySql: npm install --save mysql2 sequelize
// Seccion 11-33
// instalación del paquete babel-loader para la eliminación de los proyectos
// npm install -D babel-loader @babel/core @babel/preset-env webpack
// también se instala el paquete concurrently
// npm install --save concurrently
// instalacion de paquetes para confirmar borrado de archivos
// npm install --save axios sweetalert2

//import express from 'express';
const express = require('express');
const routes = require('./routes');
const path = require('path');         // importamos paquete de rutas del entorno
const bodyParser = require('body-parser');

// helpers con algunas funciones
const helpers = require('./helpers');

// creamos la conexion a la BD
const db = require('./config/db');

// Importamos el modelo
require('./models/proyectos');
// Con este metodo solo se conecta a la BD
//db.authenticate()
//	.then(() => console.log('Conectado al servidor'))
//	.catch(error => console.log(error));

// con este mètodo  modifica la BD, crea estructura de la BD
db.sync()
	.then(() => console.log('Conectado al servidor'))
	.catch(error => console.log(error));

/*db.authenticate()
	.then(() => console.log('Conectado al Servidor'))
	.catch(error => console.log(error));*/

// Creacion de app de express
const app = express();

// Donde cargar los archivos estaticos
app.use(express.static('public'));

// habilitamos pug
app.set('view engine', 'pug');

// añadimos carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// pasar var dump a la aplicación
app.use((req, res, next) => {
	res.locals.vardump = helpers.vardump;     // creación de variable localName
	next();
});

// Aprendiendo Middleware

// al ejecutar una consulta y no tener resultado con next() pasas a otro proceso
app.use((req, res, next)=> {
	console.log('Yo soy middleware');
	next();
});

// habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

// agregamos las rutas
app.use('/', routes());

app.listen(3000);

// engine template https://github.com/expressjs/express/wiki#templates-engines
