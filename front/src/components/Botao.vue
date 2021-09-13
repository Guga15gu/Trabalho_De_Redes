<template>
  <div class="botao-coluna">
    <div class="botao movimento" :style="corFundo"></div>
    <div class="botao apertar" :style="corFundo"></div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      posicaoNota: 398,
    };
  },
  props: ["cor", "velocidade", "tecla"],
  computed: {
    corFundo() {
      return {
        "--cor": this.cor,
        "--posicaoNota": `${this.posicaoNota}px`,
      };
    },
  },
  methods: {
    movimenta: function () {
      setInterval(() => {
        this.posicaoNota += 5;
      }, 40);
    },
  },
  created: function () {
    addEventListener("keypress", (event) => {
      if (event.key.toLowerCase() == this.tecla.toLowerCase()) {
        event.stopImmediatePropagation();
        if (this.posicaoNota >= 365 && this.posicaoNota < 375) {
          console.log(`FEZ MEIO PONTO APERTANDO ${this.tecla}`); //  TODO FEZ MEIO PONTO
        } else if (this.posicaoNota >= 375 && this.posicaoNota <= 390) {
          console.log(`FEZ PONTO APERTANDO ${this.tecla}`); //TODO FEZ PONTO COMPLETO
        } else {
          console.log(`ERROU APERTANDO ${this.tecla}`); //TODO ERROU
        }
      }
    });
  },
  mounted: function () {
    setInterval(() => {
      if (this.posicaoNota >= 393) {
        this.posicaoNota = -50;
        //TODO: ENVIAR AO SERVIDOR QUE UMA TECLA FOI PERDIDA
      }
      this.posicaoNota += 5;
    }, 40);
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
  background-color: grey;
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
}
</style>
