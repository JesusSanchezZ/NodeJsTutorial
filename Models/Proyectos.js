const Sequelize = require('sequelize');
const db = require('../config/db');

const slug = require('slug');
const shortid = require('shortid');    // agrega texto aleatoria a una cadena


const Proyectos = db.define('proyectos1',{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nombre: Sequelize.STRING,
	url : Sequelize.STRING
}, {
	hooks: {
		beforeCreate(proyecto){
			const url = slug(proyecto.nombre).toLowerCase();
			proyecto.url = `${url}-${shortid.generate()}`;
			console.log(proyecto.url);
		}
	}
});

module.exports = Proyectos;
