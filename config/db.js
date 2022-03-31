const Sequelize = require('sequelize');
const userName = 'root';
const password = 'Mca@66940$2022';
const hostName = '172.17.6.102';
const sampleDBName = 'proyectosNode';


// Creación de la conexión a la BD
const sequelize = new Sequelize(sampleDBName, userName, password,{
	host: 'localhost',
	dialect: 'mysql',
	port: '3306',
	operatorsAliases: false,
	define: {
		timestamps: false
	},
	pool:{
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

module.exports = sequelize;
