"use strict";

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});
anuncioSchema.plugin(mongoosePaginate);


anuncioSchema.statics.list = function(filter, page, cb) {

    Anuncio.paginate(filter, { page: page, limit: 10 }, function(err, result) {
        cb(err,result);
    });

};



const Anuncio = mongoose.model('Anuncio', anuncioSchema);


