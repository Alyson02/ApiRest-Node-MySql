class Tabelas{
    init(conexao){
        this.conexao = conexao;

        this.criarAtendimentos();
        this.criarPets();
    }

    criarAtendimentos(){
        const sql = `CREATE TABLE IF NOT EXISTS ATENDIMENTOS(
            ID INT PRIMARY KEY AUTO_INCREMENT,
            CLIENTE VARCHAR(50) NOT NULL,
            PET VARCHAR(20) NOT NULL,
            OBSERVACOES TEXT,
            DATA DATETIME NOT NULL,
            DATACRIACAO DATETIME NOT NULL
        )`;

        this.conexao.query(sql, erro => {
            if(erro)
                console.log(erro);
            else
                console.log("Tabela atendimentos criada com sucesso");
        });
    }

    criarPets(){
        const query = `CREATE TABLE IF NOT EXISTS Pets(
                        id int primary key auto_increment,
                        nome varchar(50),
                        imagem varchar(200))`;
        
        this.conexao.query(query, erro => {
            if(erro)
                console.log(erro);
            else
                console.log("Tabela Pets criada com sucesso");
        });
    }
}

module.exports = new Tabelas;