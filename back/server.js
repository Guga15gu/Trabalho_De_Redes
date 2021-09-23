const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 9585 })

const Jogo = require("./Jogo.js")
const jogoAtual = new Jogo (1700)
//Conexão
wss.on('connection', ws => {//Conexão foi aberta
    jogoAtual.adicionaJogador(ws) // adiciona qualquer jogador que se conextar na sala
    ws.on('message', mensagem => {
        console.log(`Recebi => ${mensagem}`)
        const resposta = JSON.parse(mensagem)
        switch (resposta.tipo) {//Formatação de acordo com o tipo de mensagem
            case "atualizacaoPontos":
                jogoAtual.atualizaPontos(resposta.mensagem,ws)
                break;
            case "controleJogo":
                jogoAtual.controlaEstado(resposta.mensagem)
                break;
            case "controleJogador":
                jogoAtual.enviaMensagemDoJogo("controleJogador", "jogadoresInsuficientes")
                break
        }
    })
})
