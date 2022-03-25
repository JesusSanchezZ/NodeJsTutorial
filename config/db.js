const Sequelize = require('sequelize');
const userName = 'examen';
const password = 'examen';
const hostName = '172.17.6.102';
const sampleDBName = 'prueba';


// Creación de la conexión a la BD
const sequelize = new Sequelize(sampleDBName, userName, password,{
	dialect: 'mssql',
	host: hostName,
	port: 1434,
	loggin: false,
	
	dialectOptions: {
		requestTimeout: 30000
	}
});

module.exports = sequelize;
