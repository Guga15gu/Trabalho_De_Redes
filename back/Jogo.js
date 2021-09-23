class Jogo {
    //Todos os atributos estão públicos porque tenho preguiça de implementar os gets e sets
    id
    DELAYBOLINHAS
    ws
    controleBolinhas
    jogadores = []
    jogadoresSuficientes = false

    constructor(delayBolinhas) {
        this.DELAYBOLINHAS = delayBolinhas
    }

    adicionaJogador(ws) {
        if (this.jogadores.length === 0) {
            this.jogadores.push({ws,pontos:0})
        }
        else if (this.jogadores.length === 1) {
            this.jogadores.push({ws, pontos: 0})
            this.jogadoresSuficientes = true
            console.log("Número correto de jogadores")
            this.iniciaJogo()
        } else {
            console.log("Temos jogadores demais")
        }
    }

    enviaMensagemProsJogadores(tipo, mensagem) {
        if (this.jogadoresSuficientes) {
            this.jogadores[0]?.ws.send(this.mensagemProCliente(tipo, mensagem))
            this.jogadores[1]?.ws.send(this.mensagemProCliente(tipo, mensagem))
        } else {
            this.jogadores[0]?.ws.send(this.mensagemProCliente("controleJogador", "jogadoresInsuficientes"))
            this.jogadores[1]?.ws.send(this.mensagemProCliente("controleJogador", "jogadoresInsuficientes"))
        }
    }

    mensagemProCliente(tipo, mensagem) {
        const mensagemFormatada = JSON.stringify({ tipo, mensagem })
        console.log("Mandei" + mensagemFormatada)
        return mensagemFormatada
    }

    controlaAsBolinhas() {
        this.controleBolinhas = setInterval(() => {
            let bolinha = Math.trunc(Math.random() * 4)
            this.enviaMensagemProsJogadores("ligaBolinha", bolinha)
        }, this.DELAYBOLINHAS);

    }

    atualizaPontos(valor, jogador) {
        if(jogador == this.jogadores[0].ws){
            this.jogadores[0].pontos += valor 
        } else if(jogador == this.jogadores[1].ws){
            this.jogadores[1].pontos += valor
        }
        //manda as atualizações de pontos para ambos os clientes
        this.jogadores[0].ws.send(this.mensagemProCliente("atualizacaoPontos", [this.jogadores[0].pontos,this.jogadores[1].pontos]))
        this.jogadores[1].ws.send(this.mensagemProCliente("atualizacaoPontos", [this.jogadores[1].pontos,this.jogadores[0].pontos]))
    }

    resetaPontos() {
        this.jogadores[0].pontos = 0
        this.jogadores[1].pontos = 0

        this.enviaMensagemProsJogadores("atualizacaoPontos", [0,0])
    }

    controlaEstado(controle) {
        if (controle == 1) {
            this.iniciaJogo()
        }
        else if (controle == 0) {
            this.finalizaJogo()
            this.jogadores[0]?.ws.close()
            this.jogadores[1]?.ws.close()
            this.jogadores= []
        } else {
            return
        }
    }

    iniciaJogo() {
        this.resetaPontos()
        this.controlaAsBolinhas()
        this.enviaMensagemProsJogadores("controleJogo", "jogoIniciou")
    }

    finalizaJogo() {
        clearInterval(this.controleBolinhas)
        this.enviaMensagemProsJogadores("resultadoFinal","fim")
        this.enviaMensagemProsJogadores("controleJogo", "jogoTerminou")
    }
}

module.exports = Jogo