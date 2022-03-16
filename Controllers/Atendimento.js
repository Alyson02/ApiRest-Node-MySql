module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send("Servidor rodando, voce sera atendido, ok!"));
}