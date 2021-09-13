<template>
  <div id="conjuntoTeclas">
    <Botao cor="#54478C" tecla="A" :ativada="ativaA" />
    <Botao cor="#2C699A" tecla="S" :ativada="ativaS" />
    <Botao cor="#F29E4C" tecla="D" :ativada="ativaD" />
    <Botao cor="#83E377" tecla="F" :ativada="ativaF" />
  </div>
</template>

<script>
import Botao from ".//Botao.vue";

export default {
  data: function () {
    return {
      ativaA: 0,
      ativaS: 0,
      ativaD: 0,
      ativaF: 0,
    };
  },
  components: {
    Botao,
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
</style>
