"use strict";


const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

const jwt = require('jsonwebtoken');
const jwtAuth = require('../../lib/jwtAuth');
const localConfig = require('../../localConfig');


router.post('/register', function(req, res, next) {
    const usuario = new Usuario(req.body);

    usuario.save(function(err, usuarioCreado) {
        if (err) {
            next(err);
            return;
        }
        const token = jwt.sign({_id: usuarioCreado._id}, localConfig.jwt.secret, {
            expiresIn: localConfig.jwt.expiresIn
        });
        res.json({success: true, data: token});
    });
});

router.post('/login', function(req, res, next) {
    const usuario = new Usuario(req.body);

    const filter = {};

    if (usuario.email) {
        filter.email = usuario.email;
    }

    if (usuario.clave) {
        filter.clave = usuario.clave;
    }

    Usuario.find(filter, function(err, docs) {
        if (err) {
            next(err);
            return;
        }

        if (docs.length == 1)
        {
            let usuarioLogado = docs[0];

            const token = jwt.sign({_id: usuarioLogado._id}, localConfig.jwt.secret, {
                expiresIn: localConfig.jwt.expiresIn
            });

            res.json({success: true, data: token});
        }
    });

});


module.exports = router;