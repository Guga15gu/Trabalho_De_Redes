//const net = require('net');
class Game {
    #id
    #numJogadores
    #players
    #estado
    #opcode
    constructor(id, estado, opcode){

        this.#id = id
        this.#numJogadores = 0
        this.#players = []
        this.#opcode = opcode
        this.#estado = estado
    }

    addPlayer(nome, socket){
        this.#players.push(new Player(this.#numJogadores, nome, socket))
        ++this.#numJogadores;
    }

    //removePlayer(){

    //}

    getPlayer(s){
        
        for(var i = 0; i< this.#numJogadores; ++i){
            if(this.#players[i].getSocket() == s){
                return this.#players[i]
            }
        }
        return null
    }

    getId(){
        return this.#id
    }
    getNumJogadores(){
        return this.#numJogadores
    }
    getOpcode(){
        return this.#opcode
    }
    setOpcode(x){
        this.#opcode = x
    }
    getEstado(){
        return this.#estado
    }
    setEstado(num){
        this.#estado = num
    }

    todosPlayersProntos(){

        for(var i = 0; i< this.#numJogadores; ++i){
            if(!this.#players[i].getPronto()){
                return false
            }
        }
        return true
    }
    writeAllPlayers(message){
        for(var i = 0; i< this.#numJogadores; ++i){
            this.#players[i].sendMessage(message)
        }
    }
}

class Player {

    #num
    #nome
    #socket
    #pronto
    #acertos
    #meioAcertos
    #erros

    constructor(num, nome, socket){
        this.#num = num
        this.#nome = nome
        this.#socket = socket
        this.#pronto = false
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

    getSocket(){
        return this.#socket
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
    getPronto(){
        return this.#pronto
    }
    setPronto(x){
        this.#pronto = x
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