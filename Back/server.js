const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 9595 })

class Mensagem{
    constructor(remetente, tipoMensagem, mensagem){
      this.remetente = remetente
      this.tipoMensagem = tipoMensagem
      this.mensagem = mensagem
    }
  
    mensagemFormatada(){
      return JSON.stringify(this)
    }
  }

let pontosTotais = 0
wss.on('connection', ws => {
  ws.on('message', mensagem=> {
    console.log(`Received message => ${mensagem}`)
    const resposta = JSON.parse(mensagem)
    switch (resposta.tipoMensagem){//Formatação de acordo com o tipo de mensagem
        case "atualizacaoPontos":
            pontosTotais+= +resposta.mensagem
            const pontosAtualizados = new Mensagem("server", "atualizacaoPontos", pontosTotais)
            ws.send(pontosAtualizados.mensagemFormatada())
        }
  })
})