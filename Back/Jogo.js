class Jogo {
    //Todos os atributos estão públicos porque tenho preguiça de implementar os gets e sets
    id
    pontosTotais
    DELAYBOLINHAS
    ws
    controleBolinhas
    jogadores = []
    jogadoresSuficientes = false
    // numJogadores
    // players
    // estado
    // opcode
    constructor(pontos, delayBolinhas) {
        this.pontosTotais = pontos
        this.DELAYBOLINHAS = delayBolinhas
        //this.id = ws._socket.remoteAddress.substr(7),
        //console.log(this.id)
        // this.#numJogadores = 0
        // this.#players = []
        // this.#opcode = opcode
        //this.#estado = estado
    }

    adicionaJogador(ws) {
        if (this.jogadores.length === 0) {
            this.jogadores.push(ws)
        }
        else if (this.jogadores.length === 1) {
            this.jogadores.push(ws)
            this.jogadoresSuficientes = true
            console.log("Número correto de jogadores")
            this.iniciaJogo()
        } else {
            console.log("Temos jogadores demais")
        }
    }

    printDebug() {
        console.log(this)
    }

    enviaMensagemDoJogo(tipo, mensagem) {
        if (this.jogadoresSuficientes) {
            this.jogadores[0]?.send(this.mensagemProCliente(tipo, mensagem))
            this.jogadores[1]?.send(this.mensagemProCliente(tipo, mensagem))
        } else {
            this.jogadores[0]?.send(this.mensagemProCliente("controleJogador", "jogadoresInsuficientes"))
            this.jogadores[1]?.send(this.mensagemProCliente("controleJogador", "jogadoresInsuficientes"))
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
            this.enviaMensagemDoJogo("ligaBolinha", bolinha)
        }, this.DELAYBOLINHAS);

    }

    atualizaPontos(valor) {
        this.pontosTotais += +valor
        this.enviaMensagemDoJogo("atualizacaoPontos", this.pontosTotais)
    }

    resetaPontos() {
        this.pontosTotais = 0
        this.enviaMensagemDoJogo("atualizacaoPontos", this.pontosTotais)
    }

    controlaEstado(controle) {
        if (controle == 1) {
            this.iniciaJogo()
        }
        else if (controle == 0) {
            this.finalizaJogo()
            this.ws.close()
        } else {
            return
        }
    }

    iniciaJogo() {
        this.resetaPontos()
        this.controlaAsBolinhas()
        this.enviaMensagemDoJogo("controleJogo", "jogoIniciou")
    }

    finalizaJogo() {
        clearInterval(this.controleBolinhas)
        this.resetaPontos()
        this.enviaMensagemDoJogo("controleJogo", "jogoTerminou")
    }
}

module.exports = Jogo