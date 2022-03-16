const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () => {

    const app = express();

    //Usando o metodo use do exprees para exepcificar requisições que usam o body
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    consign()
        .include('controllers')
        .into(app);

    return app;
}