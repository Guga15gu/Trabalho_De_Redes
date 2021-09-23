<template>
  <div class = "container">
    <Monitor :mensagens="listaDeComandos"/>
    <div v-if="mode == 'iniciar'" class="telaInicial">
      <h1>Trabalho de Redes 2021/1</h1>
      <h2>Gustavo Machado e Letícia Garcez</h2>
      <button @click="iniciaConexao" class="controleJogo">Iniciar</button>
    </div>
    <div v-else>
      <div id="conjuntoTeclas">
        <Botao
          cor="#54478C"
          tecla="A"
          :ativada="ativaA"
          @maisPontos="atualizaPontuacao"
        />
        <Botao
          cor="#16DB93"
          tecla="S"
          :ativada="ativaS"
          @maisPontos="atualizaPontuacao"
        />
        <Botao
          cor="#F29E4C"
          tecla="D"
          :ativada="ativaD"
          @maisPontos="atualizaPontuacao"
        />
        <Botao
          cor="#83E377"
          tecla="F"
          :ativada="ativaF"
          @maisPontos="atualizaPontuacao"
        />
      </div>
      <div id="pontos">
        <h1>Pontos: {{ pontos }}</h1>
        <h1>Adversario: {{ pontosAdversario }}</h1>
      </div>
      <button @click="finalizaJogo" class="controleJogo finalizar">Sair</button>
    </div>
  </div>
</template>

<script>
import Botao from "./Botao.vue";
import Monitor from "./Monitor.vue";
import { ip } from "../../config/ip";

export default {
  data: function () {
    return {
      mode: "iniciar",
      ativaA: 0,
      ativaS: 0,
      ativaD: 0,
      ativaF: 0,
      pontos: 0,
      pontosAdversario: 0,
      listaDeComandos: [],
    };
  },
  components: {
    Botao,
    Monitor,
  },
   created(){
    const vue = this
     window.addEventListener('beforeunload',function(event) {
      event.preventDefault()
      vue.finalizaJogo()
       });
  },
  methods: {
    iniciaJogo: function () {
      this.mode = "jogo";
    },

    finalizaJogo: function () {
      this.mode = "iniciar";
      this.mensagemProServidor("controleJogo", 0);
    },

    atualizaPontuacao: function (e) {
      this.mensagemProServidor("atualizacaoPontos", e);
    },

    ligaBolinha: function (n) {
      switch (n) {
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
    },

    iniciaConexao: function () {
      const url = `ws://${ip}:9585`;
      this.connection = new WebSocket(url);

      this.connection.onopen = () => {
        this.mensagemProServidor("controleJogo", "aguardando");
      };

      this.connection.onmessage = (e) => {
        const resposta = this.mensagemDoServidor(e);
        switch (resposta.tipo) {
          case "atualizacaoPontos":
            this.pontos = resposta.mensagem[0];
            this.pontosAdversario = resposta.mensagem[1];
            break;
          case "ligaBolinha":
            this.ligaBolinha(resposta.mensagem);
            break;
          case "controleJogo":
            if (resposta.mensagem === "jogoIniciou") {
              this.iniciaJogo();
            } else if (resposta.mensagem == "jogoTerminou") {
              this.finalizaJogo();
              let vitoria
              if (this.pontos > this.pontosAdversario){
                vitoria = "Você ganhou!"
              } else if (this.pontos < this.pontosAdversario){
                vitoria = "Você perdeu!"
              }
              else{
                vitoria = "Houve um empate"
              }
              window.alert(`Algum dos jogadores finalizou o jogo!\nVocê fez ${this.pontos} pontos e o seu adversário fez ${this.pontosAdversario} pontos.\n${vitoria}
              `);
              window.location.reload(true)
            }
            break;
        }
      };
    },
    mensagemProServidor: function (tipo, mensagem) {
      const mensagemFormatada = JSON.stringify({ tipo, mensagem });
      this.listaDeComandos.push({
        tipo: "enviadaDoCliente",
        mensagemFormatada,
        k: this.listaDeComandos.length,
      });
      this.connection?.send(mensagemFormatada);
    },
    mensagemDoServidor(msg) {
      const mensagemFormatada = JSON.parse(msg.data);
      this.listaDeComandos.push({
        tipo: "enviadaDoServidor",
        mensagemFormatada,
        k: this.listaDeComandos.length,
      });
      return mensagemFormatada;
    },
  }, 
};
</script>

<style>
#conjuntoTeclas {
  display: flex;
  justify-content: center;
  align-items: center;
}

div#pontos {
  display: flex;
  justify-content: center;
}
div#pontos h1 {
  text-align: center;
  background-color: #dab351ce;
  border-radius: 40px;
  display: block;
  width: 280px;
  height: 60px;
  padding: 10px;
  margin: 30px;
  color: rgb(255, 255, 255);
  display: inline;
}

.telaInicial {
  display: flex;
  flex-direction: column;
  background-color: #048aa8e7;
  padding: 30px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  height: 90vh;
  color: white;
  flex-grow: 5;
}

.controleJogo {
  font-size: 20px;
  width: 200px;
  height: 80px;
  background-color: #0db39d9d;
  border: none;
  color: white;
  border-radius: 90px;
  text-align: center;
}

.finalizar {
  display: block;
  margin: auto;
}
.controleJogo:hover {
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.507);
}
</style>
