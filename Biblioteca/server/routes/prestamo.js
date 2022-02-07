const express = require('express');
const app = express();

let Usuario = require('../models/usuario');
let Libro = require('../models/libro');

//=====================================
//Crear un prestamo al usuario
//=====================================
app.post('/prestamo', (req, res) => {

    let body = req.body;
    let prestamo = {
        codigoLibro: body.codigoLibro,
        fechaRetiro: new Date(),
        fechaMaxima: body.fechaMaxima,
        fechaEntrega: body.fechaEntrega
    };

    let codigoLibro = prestamo.codigoLibro;

    Libro.findById(codigoLibro).exec((err, libroDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'El libro no se encuentra registrado.',
                err
            });
        }
        let disponible = libroDB.disponible;
        if (disponible === true) {
            Usuario.updateOne({ identificacion: body.identificacion }, { $push: { prestamos: prestamo } }, (err, usuarioPrestamoDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                if (usuarioPrestamoDB.nModified == 0) {
                    return res.status(404).json({
                        ok: false,
                        message: "El usuario no se encuentra registrado."
                    });
                }
                actualizarNoDisponibilidadLibro(libroDB);
                return res.status(200).json({
                    ok: true,
                    message: 'Se ha registrado exitosamente el prestamo al usuario.'
                });
            });
        } else {
            return res.status(404).json({
                ok: false,
                message: "El libro no se encuntra disponible"
            });
        }
    });
});
//======================================
//Actualizar fecha de entrega del prestamo
//======================================
app.put('/prestamo', (req, res) => {

    let body = req.body;
    let identificacion = body.identificacion;
    let codigoLibro = body.codigoLibro;

    Usuario.findOne({ identificacion }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario no se encuentra registrado.'
            });
        }
        usuarioDB.prestamos = usuarioDB.prestamos.map(x => ((x.codigoLibro === codigoLibro && x.fechaEntrega == null) ? {...x, fechaEntrega: new Date() } : x));
        usuarioDB.save((err, usuarioActualizado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            actualizarDisponibilidadLibro(codigoLibro);
            res.json({
                ok: true,
                usuario: usuarioActualizado
            });
        });

    });
});


let actualizarNoDisponibilidadLibro = (libroDB) => {
    libroDB.disponible = false;
    libroDB.save((err, libroActualizado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return libroActualizado;
    });
}

let actualizarDisponibilidadLibro = (id) => {

    Libro.findById(id).exec((err, libroDB) => {

        libroDB.disponible = true;
        libroDB.save((err, libroActualizado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return libroActualizado;
        });
    });
}

module.exports = app;