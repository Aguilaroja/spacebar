//Marco de servidor
const express = require('express');
const app = express();
const Client = require('../models/client'); //Ésto es un objeto para el Schema

let verificaCliente = (req, res, next) => {
    let id = req.get('id');
    let key = req.get('key_client');

    Client.findOne({ key_client: key, id_client: id }, (err, clientDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!clientDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Autenticación errónea'
                }
            });
        }

        req.data = clientDB;

        next();
    });
}

module.exports = {
    verificaCliente
};