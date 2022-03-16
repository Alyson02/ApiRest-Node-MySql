module.exports = app => {

    app.get('/atendimentos', (req, res) => res.send("Servidor rodando, voce sera atendido, ok!"));

    app.post('/atendimentos', (req, res) => {
        console.log(req.body);
        res.send("Você realizou um post");
    });
}