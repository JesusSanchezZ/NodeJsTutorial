// Usamos modulo exprees
const express = require('express');
// de express usamos router
const router = express.Router();

// Paquete para la validación de datos
// Importamos express validator
const { body } = require('express-validator');

// importamos el controlador
const proyectosController = require('../controllers/proyectoController');
module.exports = function(){
	//Ruta para el home
	router.get('/', proyectosController.proyectosHome);
	router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
	// Llamada desde formulario por metodo post
	router.post('/nuevo-proyecto',
		body('nombre').not().isEmpty().trim().escape(), // validadmos que no este vacio, trim elimina espacios en blanco al inicio y al final. escape pone formato a los simbolos <>
		proyectosController.nuevoProyecto); 
	
	//router.get('/nosotros', proyectosController.nosotros);
	// Listar proyecto
	router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

	// Actualizar el proyecto
	router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
	router.post('/nuevo-proyecto/:id',
		body('nombre').not().isEmpty().trim().escape(), // validadmos que no este vacio, trim elimina espacios en blanco al inicio y al final. escape pone formato a los simbolos <>
		proyectosController.actualizarProyecto); 
	
	return router;
}