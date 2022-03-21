const express = require('express');
const User = require('../models/user')

const router = express.Router(); //Router = função para definir rotas, só para o usuario

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if(await User.findOne({ email }))// procura no objeto email se há um já existente
            return res.status(400).send({ Error: 'User already existis' })

        const user = await User.create(req.body);

        user.password = undefined; //Escondendo a senha do usuario

        return res.send({ user });
    } catch (err) {
        res.status(400).send({ error: 'Registration faild' });
        console.log(err);
    }
});

module.exports = app => app.use('/auth', router);