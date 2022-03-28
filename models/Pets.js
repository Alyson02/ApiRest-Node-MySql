const conexao = require('../infraestrutura/database/conexao');
const uploadDeArquivo = require('../infraestrutura/archives/uploadArquivos');


class Pet{
    adiciona(pet, res){
        const query = "INSERT INTO pets SET ?"

        uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
            if(erro)
                res.status(400).json({ erro });
            else{
            const novoPet = {nome: pet.nome, imagem: novoCaminho};
                conexao.query(query, novoPet, erro => {
                    if (erro)
                        res.status(400).json(erro);
                    else 
                        res.status(200).json(novoPet)
                })
            }
        });   
    }
}

module.exports = new Pet;