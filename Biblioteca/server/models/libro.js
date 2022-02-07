const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let libroSchema = new Schema({
    titulo: { type: String, unique: true, required: [true, 'El titulo del libro es requerido'] },
    autor: { type: String, required: [true, 'El autor del libro es requerido'] },
    anio: { type: String, required: [true, 'El año de publicación del libro es requerido'] },
    editorial: { type: String, required: [false] },
    categoria: { type: String, required: [true, 'La categoria del libro es requerido'] },
    idioma: { type: String, required: [true, 'El idioma del libro es requerido'] },
    ubicacion: { type: String, required: [true, 'El ubicación del libro es requerido'] },
    disponible: { type: Boolean, required: [true, 'El estado del libro es requerido'] }
});

module.exports = mongoose.model('libro', libroSchema, 'libro');