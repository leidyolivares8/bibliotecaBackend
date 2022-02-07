const express = require('express');
const app = express();

let Libro = require('../models/libro');

//=====================================
//Crear un libro
//=====================================
app.post('/libro', (req, res) => {

    let body = req.body;
    let libro = new Libro({
        titulo: body.titulo,
        autor: body.autor,
        anio: body.anio,
        editorial: body.editorial,
        categoria: body.categoria,
        idioma: body.idioma,
        ubicacion: body.ubicacion,
        disponible: body.disponible
    });

    libro.save((err, libroDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            libro: libroDB
        });
    });
});
//=====================================
//Obtener libros
//=====================================
app.get('/libro', (req, res) => {

    Libro.find().exec((err, librosDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (librosDB.length == 0) {
            return res.status(400).json({
                ok: false,
                message: 'No hay libros registrados.'
            });
        }
        res.json(
            librosDB
        );
    });
});
//=====================================
//Obtener libro por nombre
//=====================================
app.get('/libro/:palabra', (req, res) => {

    let palabra = req.params.palabra;
    let regTitulo = new RegExp(palabra, 'i'); //'i' sensitive mayus,minus
    //RegExp expresion regular basada en el termino para buscar en BD lo que contenga el termino

    Libro.find({ titulo: regTitulo }).exec((err, libroDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (libroDB.length == 0) {
            return res.status(400).json({
                ok: false,
                message: 'El libro no se encuentra registrado. '
            });
        }
        res.json({
            ok: true,
            libroDB
        });
    });
});
//=====================================
//Actualizar información del libro
//=====================================
app.put('/libro/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;
    let libroModificar = {
        titulo: body.titulo,
        autor: body.autor,
        anio: body.anio,
        editorial: body.editorial,
        categoria: body.categoria,
        idioma: body.idioma,
        ubicacion: body.ubicacion,
        disponible: body.disponible
    }

    Libro.findByIdAndUpdate(id, libroModificar, { new: true }, (err, libroDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!libroDB) {
            return res.status(400).json({
                ok: false,
                message: 'El libro no exixte, no se realizo el cambio.'
            });
        }
        res.json({
            ok: true,
            libroDB
        });
    });
});
//=====================================
//Eliminar libro
//=====================================
app.delete('/libro/:id', (req, res) => {

    let id = req.params.id;

    Libro.findByIdAndDelete(id, (err, libroDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        if (!libroDB) {
            return res.status(400).json({
                ok: false,
                message: 'El libro no existe.'
            });
        }
        res.json({
            ok: true,
            message: 'El libro fue eliminado.'
        });
    });
});

module.exports = app;