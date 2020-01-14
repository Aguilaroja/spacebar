//Marco de servidor
const express = require('express');
const app = express();
const Client = require('../models/client'); //Ésto es un objeto para el Schema
const { verificaCliente } = require('../middlewares/auth');

app.post('/', [verificaCliente], (req, res) => {
    data = req.data;
    // console.log(data);
    return res.json({
        ok: true,
        data
    });
});

module.exports = app;