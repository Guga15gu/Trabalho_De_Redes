const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 9585 })

const Jogo = require("./Jogo.js")

//Conexão
wss.on('connection', ws => {//Conexão foi aberta
    const jogoAtual = new Jogo (ws._socket.address(),0,2700,ws)//um novo jogo é criado
    ws.on('message', mensagem => {
        console.log(`Recebi => ${mensagem}`)
        const resposta = JSON.parse(mensagem)
        switch (resposta.tipo) {//Formatação de acordo com o tipo de mensagem
            case "atualizacaoPontos":
                jogoAtual.atualizaPontos(resposta.mensagem)
                break;
            case "controleJogo":
                jogoAtual.controlaEstado(resposta.mensagem)
                break;
        }
    })
})
