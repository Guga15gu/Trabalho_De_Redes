const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 9595 })

const mensagemProCliente = function (tipo, mensagem){
    const mensagemFormatada = JSON.stringify({tipo,mensagem})
    console.log("Mandei" + mensagemFormatada)
    return mensagemFormatada
  }

const DELAYBOLINHAS = 1500
let pontosTotais = 0
let controleBolinhas

//Conexão
wss.on('connection', ws => {//Conexão foi aberta
    ws.on('message', mensagem => {
        console.log(`Recebi => ${mensagem}`)
        const resposta = JSON.parse(mensagem)
        switch (resposta.tipo) {//Formatação de acordo com o tipo de mensagem
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
        ws.send(mensagemProCliente("ligaBolinha", bolinha))
    }, DELAYBOLINHAS);

}

function atualizaPontos(ws, valor) {
    pontosTotais += +valor
    ws.send(mensagemProCliente("atualizacaoPontos", pontosTotais))
}

function resetaPontos(ws){
    pontosTotais =0
    ws.send(mensagemProCliente("atualizacaoPontos", pontosTotais))
}

function controlaEstado(ws,estado){
    let resposta
    if(estado==1){
        resetaPontos(ws)
        controlaAsBolinhas(ws)
        resposta = mensagemProCliente("controleJogo", "jogoIniciou")
    }
    else if (estado ==0){
        clearInterval(controleBolinhas)
       resetaPontos(ws)
        resposta = mensagemProCliente("controleJogo", "jogoTerminou")
        ws.close()
    } else{
        return
    }
    ws.send(resposta)
}