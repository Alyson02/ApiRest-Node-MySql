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
                    res.status(201).json(resultados);
            })
        }
    }
}

module.exports = new Atendimento;