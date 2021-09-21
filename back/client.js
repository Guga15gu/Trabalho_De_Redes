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

    switch (estado){

        case 0:
            estado_0()   
        break

        case 1:
            estado_1()
        break

        case 2:
            estado_2()
        break

        case 3:
            estado_3()
        break
        
        case 4:
            estado_4()
        break
        default:
            console.log("Estado %d não identificado", estado)
        break
    }
});

function estado_0(){

    console.log("estado_0")
    client.write("Conectar ")
    estado = 1
}


function estado_1(){

    console.log("estado_1")
    client.write("Pronto ")
    estado = 2
}

function estado_2(){
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
function estado_3(){

    console.log("estado_3")
    client.write("Acerto ")
    
}

function estado_4(){

    console.log("estado_4")
    client.end();
}

