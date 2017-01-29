"use strict";

var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

const jwt = require('jsonwebtoken');
const jwtAuth = require('../../lib/jwtAuth');
const localConfig = require('../../localConfig');

router.use(jwtAuth());

router.get('/', function(req, res, next) {

    const tag = req.query.tag;
    const venta = (req.query.venta) ? (req.query.venta === 'true') : undefined ;
    const precioMax = parseInt(req.query.precioMax) || 0;
    const precioMin = parseInt(req.query.precioMin) || 0;
    const nombre = req.query.nombre;
    const page = parseInt(req.query.page) || 1;

    const filter = {};

    if (tag) {
        filter.tags = tag;
    }

    if (nombre) {
        filter.nombre =  { "$regex": nombre, "$options": "i" };
    }

    if(venta !== undefined)
    {
        filter.venta = { $eq: venta };
    }

    if (precioMax !== 0 && precioMin !== 0)
    {
        filter.precio = { "$lte" : precioMax , "$gte" : precioMin }
    }
    else if (precioMax !== 0)
    {
        filter.precio = { "$lte" : precioMax }
    }
    else if (precioMin !== 0){
        filter.precio = { "$gte" : precioMin }
    }

    Anuncio.list(filter, page, function(err, result) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, data: result.docs});
    });
});

router.get('/tags', function(req, res, next) {
    Anuncio.find().distinct('tags', function (error, tags) {
        res.json({ success: true, data: tags });
    });
});

module.exports = router;