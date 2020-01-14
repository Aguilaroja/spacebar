//Marco de servidor
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const Client = require('../models/client'); //Ésto es un objeto para el Schema

app.post('/:create', (req, res) => {
    let accion = req.params.create;
    let dato = req.body;

    // return res.json({
    //     accion,
    //     dato
    // });

    if (accion === 'client') {

        let random = Math.round(Math.random() * (999999999 - 111111111) + 111111111);
        //Se genera el JWT
        let token = jwt.sign({
            client: {
                id_client: random,
                name_client: dato.name_client,
                address_client: dato.address_client
            }
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        let client = new Client({ //Instancia del Schema ClientService
            id_client: random,
            name_client: dato.name_client,
            key_client: token,
            address_client: dato.address_client
        });

        // save() es una palabra reservada de mongoose
        client.save((err, clientDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                client: clientDB
            });
        });

    } else {

        res.status(500).json({
            ok: false,
            err: {
                message: 'Bad request'
            }
        })
    }

});


module.exports = app;