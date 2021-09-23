<template>
  <div class="botao-coluna">
    <div class="botao movimento" :style="corFundo"></div>
    <div class="botao apertar" :style="corFundo">{{ tecla.toUpperCase() }}</div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      posicaoNota: -50,
      velocidade: 15, //tempo em milissegundos
      emMovimento: false,
    };
  },
  props: ["cor", "tecla", "ativada"],
  computed: {
    corFundo() {
      return {
        "--cor": this.cor,
        "--posicaoNota": `${this.posicaoNota}px`,
      };
    },
  },
  watch: {
    ativada: function () {
      if (!this.emMovimento) {
        this.movimenta();
      }
    },
  },
  methods: {
    movimenta: function () {
      this.emMovimento = true;
      const movimenta = setInterval(() => {
        if (this.posicaoNota >= 393) {
          this.posicaoNota = -50;
          clearInterval(movimenta);
          this.emMovimento = false;
          return;
        }
        this.posicaoNota += 5;
      }, this.velocidade);
    },
    mandaPontos(n) {
      //console.log(`fez ${n} pontos em ${this.tecla}`)
      this.$emit("maisPontos", n);
    },
  },
  created: function () {
    addEventListener("keypress", (event) => {
      if (event.key.toLowerCase() == this.tecla.toLowerCase()) {
        event.stopImmediatePropagation();
        if (this.posicaoNota >= 365 && this.posicaoNota < 375) {
          this.mandaPontos(5);
        } else if (this.posicaoNota >= 375 && this.posicaoNota <= 390) {
          this.mandaPontos(10);
        } else {
          this.mandaPontos(0);
        }
      }
    });
  },
};
</script>

<style scoped>
.botao-coluna {
  display: flex;
  flex-direction: column;
  height: 400px;
  justify-content: flex-end;
  align-items: center;
  background-color: rgb(190, 187, 187);
  width: 60px;
  padding: 12px;
  border-radius: 20px;
  margin: 10px;
}

.movimento {
  position: absolute;
  top: var(--posicaoNota);
}
.botao {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: var(--cor);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
}
</style>
