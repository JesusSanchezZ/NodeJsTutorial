const Usuarios = require('../Models/Ususarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina : 'Crear Cuenta en UpTask'
    });
}

exports.crearCuenta = async (req, res) => {
    // leer los datos
    const {email, password} = req.body;

    try {
        // Crear el usuario 
        await Usuarios.create({
            email,
            password
        })
        .then(() => {
            res.redirect('/iniciar-sesion');
        });
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta',{
            mensajes: req.flash() ,
            nombrePagina: 'Crear Cuenta en UpTask',
            email,
            password
        })
    }

    
}