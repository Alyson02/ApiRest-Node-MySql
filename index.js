const express = require('express');

const app = express();

app.listen(3000, () => console.log('Servidor rodadndo  na porta 3000'));

app.get('/atendimentos', (req, res) => res.send("Servidor rodando, voce sera atendido, ok!"));            

