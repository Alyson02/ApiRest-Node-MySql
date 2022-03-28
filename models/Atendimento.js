const conexao = require('../infraestrutura/database/conexao')
const moment = require('moment');
const axios = require('axios')
const repositorio = require('../repository/atendimento')

class Atendimento{
    constructor(){
        this.dataEhValida = (DATA, dataCriacao) => {
            moment(DATA).isSameOrAfter(dataCriacao);
        }
        this.clienteEhValido = tamanho => tamanho >= 5;

        this.valida = parametros => this.validacoes.filter(campo =>{
            const {nome} = campo;
            const {parametro} = parametros[nome];

            return !campo.valido(parametro);
        })

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    }
    adiciona(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const DATA = moment(atendimento.DATA, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const parametros = {
            data: {DATA, dataCriacao},
            cliente: { tamanho: atendimento.CLIENTE.length}
        }

        const erros = this.valida(parametros);
        const existemErros = erros.length;

        if(existemErros)
            return new Promise((resolve, reject) => reject({erros}))
        else{
            const atendimentoDatado = {...atendimento, dataCriacao, DATA}

/*Forma mais simples, desaclopada (cada um com sua função, usando promises, ***repare no 'then')*/

            return repositorio.adiciona(atendimentoDatado).then(resultados =>{
                const id = resultados.insertId
                return { ...atendimento, id }
            });


/*Jeito acoplado e sem o uso de promises(jeito asyncrono de passar informaçoes inacessiveis de metodo)*/ 

            /*conexao.query(sql, atendimentoDatado, (erro, resultados) =>
            {
                if(erro)
                    res.status(400).json(erro);
                else{
                    const id = resultados.insertId
                    res.status(201).json({atendimento, id});
                }
            })*/
        }
    }

    lista(){
        return repositorio.lista()
    }

    getById(id, res){
        const sql = `SELECT * FROM ATENDIMENTOS WHERE ID = ${id}`;

        conexao.query(sql, async (erro, resultados) => {
            const atendimento = resultados[0];
            const cpf = atendimento.CLIENTE;

            if(erro)
                res.status(400).json(erro);
            else{
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);

                atendimento.CLIENTE = data;

                res.status(200).json({atendimento});
            }
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