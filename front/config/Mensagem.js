class Mensagem{
    constructor(remetente, tipoMensagem, mensagem){
      this.remetente = remetente
      this.tipoMensagem = tipoMensagem
      this.mensagem = mensagem
    }
  
    mensagemFormatada(){
      return JSON.stringify(this)
    }
  }

  export {Mensagem}//comentar essa linha no backend