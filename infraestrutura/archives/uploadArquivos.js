const fs = require('fs');
const path = require('path');

// Jeito errado (consome muito processamento em arquivos grandes, SINCRONO)->

/*fs.readFile('../assets/salsicha.jpg', (error, buffer) => {
    //console.log(buffer);

    fs.writeFile('../assets/salsicha2.jpg', buffer, (error) => {
        //console.log('Imagem criada');
    });
})*/


// Jeito certo (mais leve, é feito de forma assincrona, ou seja, vai carregando paralelamente STREAM)

module.exports = (caminho, nomdeDoArquivo, callbackImagemCriada) => 
{
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminho);

    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) != -1;

    if(tipoEhValido){
        const novoCaminho = `./assets/images/${nomdeDoArquivo}${tipo}`;
        
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on("finish", () => callbackImagemCriada(false, novoCaminho));
    }
    else{
        console.log('Tipo não válido');
        const erro = "Tipo inválido";
        callbackImagemCriada(erro);
    }
}