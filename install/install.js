"use strict";

// Base de datos y modelos
require('../lib/connectMongoose');
require('../models/Anuncio');
require('../models/Usuario');

const fs = require('fs');

const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');
const Usuario = mongoose.model('Usuario');


function cargarAnunciosBD(callBack) {

    Anuncio.remove(function(err,removed) {
        if (err)
        {
            console.log(err);
        }
        console.log('Borrados:', removed.result.n, 'registros')
    });

    const fichero = './install/bd.json';

    fs.readFile( fichero, 'utf8', function (err, data) {
        if (err) {
            callBack(err);
            return;
        }
        const content = JSON.parse(data);

        Anuncio.create(content.anuncios).then(function (inserted) {
            console.log(inserted);
            mongoose.connection.close()
            callBack("Base de datos correctamente actualizada (con la voz de la de avast)!!")
        }).catch(function (err){
          console.log('Error:',err);
        });

    });

}

function cargarUsuariosBD(callBack) {

    Usuario.remove(function(err,removed) {
        if (err)
        {
            console.log(err);
        }
        console.log('Borrados:', removed.result.n, 'registros')
    });

    const fichero = './install/bd.json';

    fs.readFile( fichero, 'utf8', function (err, data) {
        if (err) {
            callBack(err);
            return;
        }
        const content = JSON.parse(data);

        Usuario.create(content.usuarios).then(function (inserted) {
            console.log(inserted);
            mongoose.connection.close()
            callBack("Base de datos correctamente actualizada (con la voz de la de avast)!!")
        }).catch(function (err){
            console.log('Error:',err);
        });

    });
}

cargarAnunciosBD(function (respuesta) {
    console.log('Respuesta:', respuesta);
});

cargarUsuariosBD(function (respuesta) {
    console.log('Respuesta:', respuesta);
});