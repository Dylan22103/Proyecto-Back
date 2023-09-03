const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    DNI: String,
    Nombres: String,
    Apellidos: String,
    FechaNacimiento: Date,
    Rol: String,
    Telefono: String,
    Correo: String,
    contrasena: String,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    NombreUsuario: String
})

const user = mongoose.model('user', userSchema);

module.exports = user;