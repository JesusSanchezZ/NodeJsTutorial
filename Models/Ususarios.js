const Sequelize = require('sequelize');
const db = require('../config/db');
//const Proyectos = require('../Models/Proyectos');
const bcrypt = require('bcrypt-nodejs');
const { validate } = require('webpack');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg : 'Agrega un Correo Válido'
            }
        },
        unique: {
            args: true,
            msg: '¡El Usuario ya está registrado!'
        },
        notEmpty:{
            msg: 'El email no puede ir vacío'
        }

    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty: {
                msg: 'El password no puede ir vacío'
            }
        }
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE
}, {
    hooks: {
        beforeCreate(usuario) {
            // antes de almacenar el password la encripta
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
});

// Métodos persnoalizados
Usuarios.prototype.verificarPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

//Usuarios.hasMany(Proyectos);

module.exports = Usuarios;