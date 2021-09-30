
//function client_(){

        //const { Socket } = require('dgram');
const net = require('net');

const client = new net.Socket();
const port = 8080
client.connect({ port: port });

var estado = 0
var opcode = ""

client.on('data', (data) => {
    console.log(data.toString('utf-8'));

    opcode = data.toString().substring(0, data.indexOf(" "))
    let conteudo = data.toString().substring(data.indexOf(" "))

    switch (estado){

        case 0:
            estado_0(conteudo)   
        break

        case 1:
            estado_1(conteudo)
        break

        case 2:
            estado_2(conteudo)
        break

        case 3:
            estado_3(conteudo)
        break
        
        case 4:
            estado_4(conteudo)
        break
        default:
            console.log("Estado %d não identificado", estado)
        break
    }
});

function estado_0(conteudo){

    console.log("estado_0")
    client.write("Conectar ")
    estado = 1
}


function estado_1(conteudo){

    console.log("estado_1")
    client.write("Pronto ")
    estado = 2
}

function estado_2(conteudo){
    console.log("estado_2")

    switch (opcode){
        case "Comecou":
            estado = 3
        break

        case "":
        break

        default:
            console.log("Opcode - %s - não identificado", opcode)
        break
    }   

}
function estado_3(conteudo){

    switch (opcode){
        case "fimDeJogo":
            client.write("adeus ")
            estado = 4
        break

        case "pontosSeus":
            this.pontos = conteudo
        break

        case "pontosAdversario":
            this.pontosAdversario = conteudo
        break

        case "ligaBolinha":
            this.ligaBolinha = conteudo
        break

        default:
            console.log("Opcode - %s - não identificado", opcode)
        break
    }   
    console.log("estado_3")
}

function estado_4(conteudo){

    console.log("estado_4")
    this.finalizaJogo1();
    let vitoria
            if (this.pontos > this.pontosAdversario){
            vitoria = "Você ganhou!"
            } else if (this.pontos < this.pontosAdversario){
            vitoria = "Você perdeu!"
            }
            else{
            vitoria = "Houve um empate."
            }
            window.alert(`Algum dos jogadores finalizou o jogo!\nVocê fez ${this.pontos} pontos e o seu adversário fez ${this.pontosAdversario} pontos.\n${vitoria}
            `);
            window.location.reload(true)

    client.end();
}


//}
//module.exports = client