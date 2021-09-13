<template>
  <div id="app">
    <Botao cor="#F1C453" tecla = "A"/>
    <Botao cor="#F1C453" tecla = "S"/>
  </div>
</template>

<script>
import Botao from './components/Botao.vue'

export default {
  name: 'App',
  components: {
    Botao
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-content: space-between;
}
</style>
