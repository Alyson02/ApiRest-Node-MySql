const Atendimento = require('../models/Atendimento')

module.exports = app => {

    app.get('/atendimentos', (req, res) => res.send("Servidor rodando, voce sera atendido, ok!"));

    app.post('/atendimentos', (req, res) => {
        
        const atendimento = req.body;
        Atendimento.adiciona(atendimento, res);

    });
}