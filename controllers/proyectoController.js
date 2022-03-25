// importamos modelo
const Proyectos = require('../models/Proyectos');

// importamos slug, este paquete cambia los espacios en blanco por guiones medios
//const slug = require('slug');

// generamos las vistas 
exports.proyectosHome = async (req,res)=>{
	// sin engine template pug: res.send('Index');
	//const proyectos = await Proyectos.findAll();  // Consulta los registros de la tabla proyectos
	
	res.render('index',{
		nombrePagina: 'Proyectos',
		//proyectos                   // Manda los resultados a la vista.
	});
}

exports.formularioProyecto = (req, res)=>{
	res.render('nuevoProyecto',{
		nombrePagina: 'Nuevo Proyecto'
	});
}

exports.nuevoProyecto = async (req, res) => {
	//res.send('Enviaste el formulario');
	// enviar a la consola lo que el usuario escriba
	//console.log(req.body);
	// validamos que tengamos algo en el input
	const { nombre } = req.body;
	
	let errores = [];
	
	if(!nombre){
		errores.push({'texto': 'Agrega un Nombre al Proyecto'});
	}
	
	// si hay errores
	if(errores.length > 0){
		res.render('nuevoProyecto', {
			nombrePagina : 'Nuevo Proyecto',
			errores
		})
	} else {
		// no hay errores
		// inserta en la BD.
		//console.log(slug(nombre).toLowerCase());
		//const url = slug(nombre).toLowerCase();
		const proyecto = await Proyectos.create({nombre})
			.then(() => console.log('Insertado Correctamente'))
			.catch(error => console.log(error));
		res.redirect('/');
	}
}

/*exports.nosotros = (req,res)=>{
	res.render('nosotros');
}*/
