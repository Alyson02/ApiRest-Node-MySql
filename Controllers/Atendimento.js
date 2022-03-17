const Atendimento = require('../models/Atendimento')

module.exports = app => {

    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res);
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.getById(id, res);
    });

    app.post('/atendimentos', (req, res) => {
        
        const atendimento = req.body;
        Atendimento.adiciona(atendimento, res);

    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.altera(id, valores, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.exclui(id, res);
    });
}