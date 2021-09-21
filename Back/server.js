const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 9595 })

class Mensagem {
    constructor(remetente, tipoMensagem, mensagem) {
        this.remetente = remetente
        this.tipoMensagem = tipoMensagem
        this.mensagem = mensagem
    }

    mensagemFormatada() {
        return JSON.stringify(this)
    }
}

const DELAYBOLINHAS = 1200
let pontosTotais = 0
let controleBolinhas

//Conexão
wss.on('connection', ws => {//Conexão foi aberta
    ws.on('message', mensagem => {
        console.log(`Recebi => ${mensagem}`)
        const resposta = JSON.parse(mensagem)
        switch (resposta.tipoMensagem) {//Formatação de acordo com o tipo de mensagem
            case "atualizacaoPontos":
                atualizaPontos(ws, resposta.mensagem)
                break;
            case "controleJogo":
                controlaEstado(ws, resposta.mensagem)
                break;
        }
    })
})

function controlaAsBolinhas(ws) {
 controleBolinhas = setInterval(() => {
        const bolinha = Math.trunc(Math.random() * 4)
        const mensagem = new Mensagem("server", "ligaBolinha", bolinha)
        ws.send(mensagem.mensagemFormatada())
    }, DELAYBOLINHAS);

}

function atualizaPontos(ws, valor) {
    pontosTotais += +valor
    const pontosAtualizados = new Mensagem("server", "atualizacaoPontos", pontosTotais)
    ws.send(pontosAtualizados.mensagemFormatada())
}

function resetaPontos(ws){
    pontosTotais =0
    const pontosAtualizados = new Mensagem("server", "atualizacaoPontos", pontosTotais)
    ws.send(pontosAtualizados.mensagemFormatada())
}

function controlaEstado(ws,estado){
    let resposta
    if(estado==1){
        controlaAsBolinhas(ws)
        resposta = new Mensagem("server", "controleJogo", "jogoIniciou")
    }
    else if (estado ==0){
        clearInterval(controleBolinhas)
       resetaPontos(ws)
        resposta = new Mensagem("server", "controleJogo", "jogoTerminou")
    } else{
        return
    }
    ws.send(resposta.mensagemFormatada())
}