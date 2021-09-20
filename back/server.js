const net = require('net');
const Game = require('./classes.js')
const port = 8080

var sala = 0
var game = null

const server = net.createServer( (socket2) => {

    var x ={estado: 0, opcode: "", socket: socket2} 
    //var estado = 0
    //var opcode = ""
    //var socket

    x.socket = socket2
    console.log('Connection from', x.socket.remoteAddress, 'port', x.socket.remotePort);
    
    if (game === null) {
        game = new Game(sala);
        ++sala
        game.addPlayer("teste", x.socket)
    } 
    else {
        game.addPlayer("teste2", x.socket)
        game = null;
    }
    /*
    socket.on("connect", (socket) => {
        console.log("Connect")
    })
    */

    //var conectadoPlayer = False, False
    //var prontoPlayer = False, False
    x.socket.write("Olá")

    x.socket.on("data", (data) => {

        console.log("Mensagem recebida: %s", data)

        x.opcode = data.toString().substring(0, data.indexOf(" "))
        
        switch (x.estado){
            case 0:
                estado_0(x)
            break;
        
            case 1:
                estado_1(x)
            break;
            
            case 2:
                estado_2(x)
            break;
    
            case 3:
                estado_3(x)
            break;

            default:
                console.log("Estado %d não identificado", estado)
            break
        }

    })

    x.socket.on("end", () => {
        console.log("Conexão finalizada")
    })

});

server.listen(port);

function estado_0(x){

    console.log("estado_0")

    switch (x.opcode){

        case "Conectar":
            console.log("Opcode - %s - identificado", x.opcode)
            x.estado = 1
            x.socket.write("Conectado ")
            break
        case "":
            console.log("???", x.opcode)
            break
        default:
            console.log("Opcode - %s - não identificado", x.opcode)
            //socket.write("Opcode Errado")
            break
    }
}

function estado_1(x){

    console.log("estado_1")
    switch (x.opcode){

        case "Pronto":
            console.log("Opcode - %s - identificado", x.opcode)
            x.estado = 2
            x.socket.write("Começou ")
            break
        case "":
            console.log("Opcode - %s - identificado", x.opcode)
            break
        default:
            console.log("Opcode - %s - não identificado", x.opcode)
            x.socket.write("OpcodeErrado ")
            break
    }
}

function estado_2(x){

    console.log("estado_2")
    switch (x.opcode){

        case "Acerto":
            console.log("Opcode - %s - identificado", x.opcode)
            
            break
        case "Erro":
            console.log("Opcode - %s - identificado", x.opcode)
           
            break
        case "MeioAcerto":
            console.log("Opcode - %s - identificado", x.opcode)
            break
        default:
            console.log("Opcode - %s - não identificado", x.opcode)
            //socket.write("OpcodeErrado ")
            break
    }
}

function estado_3(x){

    console.log("estado_3")
    socket.write("FimDeJogo ")
}