const express = require('express');
const app = express();

let Usuario = require('../models/usuario');

//=====================================
//Crear un usuario
//=====================================
app.post('/usuario', (req, res) => {

    let body = req.body;
    let usuario = new Usuario({
        tipoIdentificacion: body.tipoIdentificacion,
        identificacion: body.identificacion,
        nombre: body.nombre,
        celular: body.celular,
        correo: body.correo,
        direccion: body.direccion,
        fechaIngreso: new Date()
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});
//=====================================
//Obtener usuarios
//=====================================
app.get('/usuario', (req, res) => {

    Usuario.find().exec((err, usuariosDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (usuariosDB.length == 0) {
            return res.status(400).json({
                ok: false,
                message: 'No hay libros registrados.'
            });
        }
        res.json({
            ok: true,
            usuariosDB
        });
    });
});
//=====================================
//Obtener un usuario por identificacion
//=====================================
app.get('/usuario/:identificacion', (req, res) => {

    let identificacion = req.params.identificacion;

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
        res.json({
            ok: true,
            usuarioDB
        });
    });
});
//=====================================
//Actualizar información del usuario
//=====================================
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;
    let usuarioModificar = {
        celular: body.celular,
        correo: body.correo,
        direccion: body.direccion
    }

    Usuario.findByIdAndUpdate(id, usuarioModificar, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario no exixte, no se realizo el cambio.'
            });
        }
        res.json({
            ok: true,
            usuarioDB
        });
    });
});
//=====================================
//Eliminar usuario
//=====================================
app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario no existe.'
            });
        }
        res.json({
            ok: true,
            message: 'El usuario fue eliminado.'
        });
    });
});

module.exports = app;