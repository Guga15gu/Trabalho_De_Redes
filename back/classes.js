//const net = require('net');
class Game {
    #id
    #numJogadores
    #players
    constructor(id){

        this.#id = id
        this.#numJogadores = 0
        this.#players = []
    }

    addPlayer(nome, socket){
        this.#players.push(new Player(this.#numJogadores, nome, socket))
    }

    getPlayer(num){
        return this.#players[num]
    }

    getId(){
        return this.#id
    }

}

class Player {

    #num
    #nome
    #socket
    #acertos
    #meioAcertos
    #erros

    constructor(num, nome, socket){
        this.#num = num
        this.#nome = nome
        this.#socket = socket
        this.#acertos = [0, 0, 0, 0]
        this.#meioAcertos = [0, 0, 0, 0]
        this.#erros = [0, 0, 0, 0]
    }
    //this.socket.write(("Conectar %s", nome))

    sendMessage(m){
        this.#socket.write(m)
    }
    
    setSocket(socket){
        this.#socket = socket
    }

    addAcerto(qual){
        ++this.#acertos[qual]
    }

    addErro(qual){
        ++this.#erros[qual]
    }

    addMeioAcerto(qual){
        ++this.#meioAcertos[qual]
    }

    getAcertos(qual){
        return this.#acertos[qual]
    }

    getErros(qual){
        return this.#erros[qual]
    }

    getMeioAcertos(qual){
        return this.#meioAcertos[qual]
    }

    getNome(){
        return this.#nome
    }

    getNum(){
        return this.#num
    }
}
module.exports = Game
/*
let g = new Game(0)

g.addPlayer("Gustavo", 34)

console.log("%d", g.getPlayer(0).getAcertos(0))
g.getPlayer(0).addAcerto(0)
console.log("%d", g.getPlayer(0).getAcertos(0))
*/