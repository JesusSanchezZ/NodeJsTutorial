// importamos modelo
const Proyectos = require('../models/Proyectos');
const Tareas = require('../Models/Tareas');

// importamos slug, este paquete cambia los espacios en blanco por guiones medios
//const slug = require('slug');

// generamos las vistas 
exports.proyectosHome = async (req,res)=>{
	// sin engine template pug: res.send('Index');
	const proyectos = await Proyectos.findAll();  // Consulta los registros de la tabla proyectos
	
	res.render('index',{
		nombrePagina: 'Proyectos',
		proyectos                   // Manda los resultados a la vista.
	});
}

exports.formularioProyecto = async (req, res)=>{
	const proyectos = await Proyectos.findAll();

	res.render('nuevoProyecto',{
		nombrePagina: 'Nuevo Proyecto',
		proyectos
	});
}

exports.nuevoProyecto = async (req, res) => {
	//res.send('Enviaste el formulario');
	// enviar a la consola lo que el usuario escriba
	//console.log(req.body);
	// validamos que tengamos algo en el input
	const { nombre } = req.body;

	const proyectos = await Proyectos.findAll();
	
	let errores = [];
	
	if(!nombre){
		errores.push({'texto': 'Agrega un Nombre al Proyecto'});
	}
	
	// si hay errores
	if(errores.length > 0){
		res.render('nuevoProyecto', {
			nombrePagina : 'Nuevo Proyecto',
			errores,
			proyectos
		})
	} else {
		// no hay errores
		// inserta en la BD.
		//console.log(slug(nombre).toLowerCase());
		//const url = slug(nombre).toLowerCase();
		await Proyectos.create({nombre})
			.then(() => console.log('Insertado Correctamente'))
			.catch(error => console.log(error));
		res.redirect('/');
	}
}

/*exports.nosotros = (req,res)=>{
	res.render('nosotros');
}*/

exports.proyectoPorUrl = async (req, res, next) => {
	// Obtenemos los proyectos
	const proyectosPromise = Proyectos.findAll();

	//res.send(req.params.url);
	const proyectoPromise = Proyectos.findOne({
		where: {
			url: req.params.url
		}
	});

	const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

	// Consultar tareas del proyecto actual
	const tareas = await Tareas.findAll({
		where: {
			proyectoId : proyecto.id
		}/*,
		include: [
			{
				model : Proyectos
			}
		]*/
	});

	if(!proyecto) return next();

	// renderizamos la vista
	res.render('tareas', {
		nombrePagina: 'Tareas del proyecto',
		proyecto,
		proyectos,
		tareas
	})
	//console.log(proyecto);
	//res.send('Ok');
}

exports.formularioEditar = async (req, res) =>{
	/**
	 * Como las variables no dependen unas de otras se quitan los waits y
	 * se usan las promises para invocar los datos
	 * const proyectos = await Proyectos.findAll();

	// Busca los datos del id del llamado
	const proyecto = await Proyectos.findOne({
		where: {
			id: req.params.id;
		}
	});
	 */
	// Buscamos todos los proyectos y los alamacenamos
	const proyectosPromise = Proyectos.findAll();
	// Busca los datos del id del llamado
	const proyectoPromise = Proyectos.findOne({
		where: {
			id: req.params.id
		}
	});

	// LLamamos a la promeso con una lista de parametros en formato de arreglos
	const [proyectos, proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);

	// renderizar vista
	res.render('nuevoProyecto',{
		nombrePagina: 'Editar Proyecto',
		proyectos,
		proyecto
	});
}

exports.actualizarProyecto = async (req, res) => {
	//res.send('Enviaste el formulario');
	// enviar a la consola lo que el usuario escriba
	//console.log(req.body);
	// validamos que tengamos algo en el input
	const { nombre } = req.body;

	const proyectos = await Proyectos.findAll();
	
	let errores = [];
	
	if(!nombre){
		errores.push({'texto': 'Agrega un Nombre al Proyecto'});
	}
	
	// si hay errores
	if(errores.length > 0){
		res.render('nuevoProyecto', {
			nombrePagina : 'Nuevo Proyecto',
			errores,
			proyectos
		})
	} else {
		// no hay errores
		// actualiza en la BD.
		//console.log(slug(nombre).toLowerCase());
		//const url = slug(nombre).toLowerCase();
		await Proyectos.update(
				{nombre: nombre},
				{ where: { id: req.params.id }}
			);
		res.redirect('/');
	}
}

exports.eliminarProyecto = async (req, res, next) => {
	// req, query o params 
	//console.log(req.query);
	const {urlProyecto} = req.query;

	const resultado = await Proyectos.destroy({
		where: {
			url: urlProyecto
		}
	});

	if(!resultado){
		return next();
	}

	res.status(200).send('Proyecto eliminado Correctamente');
} 