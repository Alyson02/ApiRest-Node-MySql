const conexao = require('../infraestrutura/conexao')
const moment = require('moment');

class Atendimento{
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.Cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros)
            res.status(400).json(erros);
        else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            const sql = "INSERT INTO ATENDIMENTOS SET ?";

            conexao.query(sql, atendimentoDatado, (erro, resultados) =>
            {
                if(erro)
                    res.status(400).json(erro);
                else
                    res.status(201).json(atendimento);
            })
        }
    }

    lista(res){
        const sql = "SELECT * FROM ATENDIMENTOS"

        conexao.query(sql, (erro, resultados) => {
            if(erro)
                res.status(400).json(erro);
            else
                res.status(200).json(resultados);
        });
    }

    getById(id, res){
        const sql = `SELECT * FROM ATENDIMENTOS WHERE ID = ${id}`;

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0];

            if(erro)
                res.status(400).json(erro);
            else
                res.status(200).json(atendimento);
        })
    }

    altera(id, valores, res){
        if(valores.data)
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
            console.log(valores.data);
        
        const sql = "UPDATE ATENDIMENTOS SET ? WHERE ID = ?"

        conexao.query(sql, [valores, id], (erro, resultados) =>{
            if(erro)
                res.status(400).json(erro);
            else
                res.status(200).json({...valores, id});
        });
    }

    exclui(id, res){
        const sql = `DELETE FROM ATENDIMENTOS WHERE ID = ${id}`;

        conexao.query(sql, (erro, resultados) => {
            if(erro)
                res.status(400).json(erro);
            else
                res.status(200).json({id});
        })
    }
}

module.exports = new Atendimento;