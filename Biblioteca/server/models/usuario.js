const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    tipoIdentificacion: { type: String, required: [true, 'El tipo de identificacion es necesaria'] },
    identificacion: { type: Number, unique: true, required: [true, 'La identificacion es necesaria'] },
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    celular: { type: String, required: [true, 'El celular es necesario'] },
    correo: { type: String, required: [true, 'El correo es necesario'] },
    direccion: { type: String, required: [true, 'Una direccion es necesaria'] },
    fechaIngreso: { type: Date, required: false },
    prestamos: { type: Array, default: [] }
});

module.exports = mongoose.model('usuario', usuarioSchema, 'usuario');