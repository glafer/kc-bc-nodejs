"use strict";

const mongoose = require('mongoose');

var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});
/*
usuarioSchema.statics.list = function(filter, cb) {
    const query = Agente.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    query.exec(cb);
};*/

const Usuario = mongoose.model('Usuario', usuarioSchema);