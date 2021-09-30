const net = require('net');
const Game = require('./classes.js')
const port = 9080

var sala = 0
var gameSalas = []
var game = false
var map = new Map()
const server = net.createServer( (socket2) => {

    //var x ={estado: 0, opcode: "", game: null}

    //x.socket = socket2
    console.log('Connection from', socket2.remoteAddress, 'port', socket2.remotePort);
    
    if (!game) {
        game = true
        gameSalas.push(new Game(sala, 0, ""))

        map.set(socket2.remotePort, sala)
        gameSalas[sala].addPlayer("teste", socket2)
    } 
    else {
        map.set(socket2.remotePort, sala)
        gameSalas[sala].addPlayer("teste2", socket2)
        game = false;
        ++sala
    }
    var salaCliente = map.get(socket2.remotePort)

    socket2.write("Olá")

    socket2.on("data", (data) => {

        console.log("Mensagem recebida: %s", data)

        gameSalas[salaCliente].setOpcode(data.toString().substring(0, data.indexOf(" ")))

        let conteudo = data.toString().substring(data.indexOf(" "))

        switch (gameSalas[salaCliente].getEstado()){
            case 0:
                estado_0(gameSalas[salaCliente], socket2, conteudo)
            break;
        
            case 1:
                estado_1(gameSalas[salaCliente], socket2, conteudo)
            break;
            
            case 2:
                estado_2(gameSalas[salaCliente], socket2, conteudo)
            break;
    
            case 3:
                estado_3(gameSalas[salaCliente], socket2, conteudo)
            break;

            default:
                console.log("Estado %d não identificado", gameSalas[salaCliente].getEstado())
            break
        }

    })

    socket2.on("end", () => {
        console.log("Conexão finalizada")
    })

});

server.listen(port);

function estado_0(x, socket, conteudo){

    console.log("estado_0")

    console.log("Opcode - %s - identificado", x.getOpcode())
    switch (x.getOpcode()){

        case "Conectar":
            
            if(x.getNumJogadores() == 1){
                x.setEstado(0)
                socket.write("Conectado ")
            }
            else{
                x.setEstado (1)
                socket.write("Conectado ")
            }
        break
        case "Pronto":
            x.getPlayer(socket).setPronto(true)
            //socket.write("Conectado ")
        break
        default:
            //socket.write("Opcode Errado")
        break
    }
}

function estado_1(x, socket, conteudo){

    console.log("estado_1")
    switch (x.getOpcode()){

        case "Pronto":
            console.log("Opcode - %s - identificado", x.getOpcode())

            x.getPlayer(socket).setPronto(true)

            if(x.todosPlayersProntos()){
                x.setEstado(2)
                x.writeAllPlayers("Comecou ")
            }
            else{
                
                x.setEstado(1)
                //x.socket.write("EsperandoOutroPronto ")
            }
            break

        case "":
            console.log("Opcode - %s - identificado", x.getOpcode())
            break
        default:
            console.log("Opcode - %s - não identificado", x.getOpcode())
            socket.write("OpcodeErrado ")
            break
    }
}

function estado_2(x, socket, conteudo){

    console.log("estado_2")
    switch (x.getOpcode()){

        case "Acerto":
            console.log("Opcode - %s - identificado", x.getOpcode())
            x.getPlayer(socket).addAcerto(conteudo)

            socket.write("pontosSeus %d", x.getPlayer(socket).getAcertos)
            x.writeAllPlayersExceptMe("pontosAdversario %d", x.getPlayer(socket).getAcertos)

            if(x.getPlayer(socket).getAcertos(0) == 10){
                x.writeAllPlayers("fimDeJogo ")
                x.setEstado(3)
            }
            break
        case "Erro":
            console.log("Opcode - %s - identificado", x.getOpcode())
            x.getPlayer(socket).addErro(conteudo)
            break
        case "MeioAcerto":
            console.log("Opcode - %s - identificado", x.getOpcode())
            x.getPlayer(socket).addMeioAcerto(conteudo)
            break
        default:
            console.log("Opcode - %s - não identificado", x.getOpcode())
            //socket.write("OpcodeErrado ")
            break
    }
}

function estado_3(x, socket, conteudo){

    switch (x.getOpcode()){

        case "adeus ":
            console.log("Opcode - %s - identificado", x.getOpcode())
            socket.write("adeus ")
            break

        case "":
    
            break
        default:
            console.log("Opcode - %s - não identificado", x.getOpcode())
            //socket.write("OpcodeErrado ")
            break
    }

    console.log("estado_3, fim de jogo")
    
}