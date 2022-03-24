// generamos las vistas 
exports.proyectosHome = (req,res)=>{
	// sin engine template pug: res.send('Index');
res.render('index',{
	nombrePagina: 'Proyectos'
});
}

exports.formularioProyecto = (req, res)=>{
	res.render('nuevoProyecto',{
		nombrePagina: 'Nuevo Proyecto'
	});
}

exports.nuevoProyecto = (req, res) => {
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
	}
}

/*exports.nosotros = (req,res)=>{
	res.render('nosotros');
}*/