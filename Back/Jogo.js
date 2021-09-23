class Jogo {
    //Todos os atributos estão públicos porque tenho preguiça de implementar os gets e sets
    id
    pontosTotais
    DELAYBOLINHAS
    ws
    controleBolinhas
    // numJogadores
    // players
    // estado
    // opcode
    constructor(id, pontos, delayBolinhas, ws) {
        this.id = id.address
        this.pontosTotais = pontos
        this.DELAYBOLINHAS = delayBolinhas
        this.ws = ws
        console.log(this.id)
        // this.#numJogadores = 0
        // this.#players = []
        // this.#opcode = opcode
        //this.#estado = estado
    }

    printDebug() {
        console.log(this)
    }

    mensagemProCliente(tipo, mensagem) {
        const mensagemFormatada = JSON.stringify({ tipo, mensagem })
        console.log("Mandei" + mensagemFormatada)
        return mensagemFormatada
    }

    controlaAsBolinhas() {
        this.controleBolinhas = setInterval(() => {
            let bolinha = Math.trunc(Math.random() * 4)
            this.ws.send(this.mensagemProCliente("ligaBolinha", bolinha))
        }, this.DELAYBOLINHAS);

    }

    atualizaPontos(valor) {
        this.pontosTotais += +valor
        this.ws.send(this.mensagemProCliente("atualizacaoPontos", this.pontosTotais))
    }

    resetaPontos() {
        this.pontosTotais = 0
        this.ws.send(this.mensagemProCliente("atualizacaoPontos", this.pontosTotais))
    }

    controlaEstado(estado) {
        let resposta
        if (estado == 1) {
            this.iniciaJogo()
        }
        else if (estado == 0) {
            this.finalizaJogo()
            this.ws.close()
        } else {
            return
        }
    }

    iniciaJogo() {
        this.resetaPontos()
        this.controlaAsBolinhas()
        const resposta = this.mensagemProCliente("controleJogo", "jogoIniciou")
        this.ws.send(resposta)
    }

    finalizaJogo() {
        clearInterval(this.controleBolinhas)
        this.resetaPontos()
        const resposta = this.mensagemProCliente("controleJogo", "jogoTerminou")
        this.ws.send(resposta)
    }
}

module.exports = Jogo