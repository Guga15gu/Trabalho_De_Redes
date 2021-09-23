<template>
    <div id = "monitor">
        <h2>Monitor de Mensagens</h2>
        <ul>
            <li v-for= "msg in mensagens" :key=msg :class = "msg.tipo">{{msg.mensagemFormatada}}</li>
        </ul>
    </div>
</template>

<script>
export default{
    data: function (){
        return {}
    },
    props:["mensagens"]
}

</script>

<style scoped>
div#monitor{
    height: 650px;
    width: 450px;
    background-color: #d8ddd8;
    float: left;
    position: absolute;
    margin: 10px;
    border-radius: 20px;
    overflow:auto;
}

h2{
    text-align: center;
    color:#2C699A;
    margin-bottom: 0px;
}

ul{
    margin: 0px;
    width: 450px;
    padding: 0px;
    display: flex;
    flex-direction: column-reverse;
}

li{
    list-style: none;
    margin:0px;
    padding: 0px;
    font-weight: bold;
    font-size: 15px;
}

li.enviadaDoCliente{
    text-align: left;
    margin-left: 15px;
    color:#F29E4C;
}

li.enviadaDoServidor{
    text-align: right;
    margin-right: 15px;
    color: #54478C;
}
</style>