const query = require('../infraestrutura/database/queries');

class Atendimento{
    adiciona(atendimento){
        const sql = 'INSERT INTO Atendimentos SET ?';
        return query(sql, atendimento);
    }

    lista(){
        const sql = "SELECT * FROM ATENDIMENTOS";
        return query(sql);
    }
}

module.exports = new Atendimento();