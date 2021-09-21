<template>
<div>
  <div id="conjuntoTeclas">
    <Botao cor="#54478C" tecla="A" :ativada="ativaA" @atualizaPontos="atualizaPontuacao" />
    <Botao cor="#2C699A" tecla="S" :ativada="ativaS" @atualizaPontos="atualizaPontuacao" />
    <Botao cor="#F29E4C" tecla="D" :ativada="ativaD" @atualizaPontos="atualizaPontuacao" />
    <Botao cor="#83E377" tecla="F" :ativada="ativaF" @atualizaPontos="atualizaPontuacao" />
  </div>
    <h1 id = "pontos">Pontos: {{pontos}}</h1>
</div>
</template>

<script>
import Botao from "./Botao.vue";
import {ip} from "../../config/ip"
import {Mensagem} from "../../config/Mensagem"
export default {
  data: function () {
    return {
      ativaA: 0,
      ativaS: 0,
      ativaD: 0,
      ativaF: 0,
      pontos: 0
    }
  },
  components: {
    Botao,
  },
  methods:{
    atualizaPontuacao: function (e){
      console.log(e + "recebi")
      let alteracaoDePontos = new Mensagem("cliente1", "atualizacaoPontos", e)
      this.connection.send(alteracaoDePontos.mensagemFormatada())
    }
  },
  beforeCreate: function(){
  const url = `ws://${ip}:9595`
  this.connection = new WebSocket(url)
 
this.connection.onopen = () => {
  let conexaoAberta = new Mensagem ("cliente 1", "abertura", "cliente ligado")
  this.connection.send(conexaoAberta.mensagemFormatada()) 
}
 
this.connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}
 
this.connection.onmessage = (e) => {
  let resposta = JSON.parse(e.data)
  switch (resposta.tipoMensagem){//Formatação de acordo com o tipo de mensagem
        case "atualizacaoPontos":
            this.pontos = resposta.mensagem
            
        }
}
  },
  created: function () {//TODO: passar essa função pro back de alguma forma
    setInterval(() => {
      let indice = Math.trunc(Math.random() * 4);
      switch (indice) {
        case 0:
          this.ativaA++;
          break;
        case 1:
          this.ativaS++;
          break;
        case 2:
          this.ativaD++;
          break;
        case 3:
          this.ativaF++;
          break;
      }
    }, 1200);
  },
};
</script>

<style>
#conjuntoTeclas {
  display: flex;
  justify-content: center;
  align-items: center;
}
#pontos{
  text-align: center;
  background-color: rgb(190, 187, 187);
  border-radius: 20px;
}
</style>
