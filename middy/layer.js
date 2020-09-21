'use strict'

class Layer {
  // Criação do singleton
  constructor () {
    if (!Layer.instance) {
      Layer.instance = this
    }

    return Layer.instance
  }

  async exampleFunction () {
    /**
     *
     * Definição das funcionalidades...
     *
     **/

    return {
      status: 'SUCCESS',
      msg: 'Exemplo da criação de um layer'
    }
  }
}

module.exports = new Layer()
