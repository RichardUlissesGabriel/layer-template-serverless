# Layer Template Serverless

Esse projeto tem como objetivo servir de base para a construção dos lambdas Layers

Esse projeto também é utilizado no projeto [project-template-serverless](https://github.com/RichardUlissesGabriel/project-template-serverless).

 ## Configuração
Realizar a alteração do arquivo de configuração serverless.yml
````yaml
layers:
  MiddyDependencies<***NOME DO LAYER***>:
    path: middy
    name: MiddyDependency<***NOME DO LAYER***>-${self:provider.stage}
    description: "Dependency for ..."
    compatibleRuntimes: # optional, a list of runtimes this layer is compatible with
      - ${self:provider.runtime}
````

O desenvolvimento da funcionalidade deve ser escrito no arquivo ***middy/nome_do_layer.js***

***Atenção!!!*** 
Caso o layer possua dependências as mesmas ***devem*** ser instaladas dentro da pasta ***middy/*** e mantidas ao fazer o deploy do layer.

Em resumo os layers devem enviar a pasta **node_module** para frente.

## Deploy
A realização do deploy é muito simples, com tudo definido e desenvolvido realizar o seguinte comando **serverless**

```
sls deploy --stage={ambiente}
```

Para **ambiente** temos as seguintes opções:

| Ambiente | Descrição                                                   |
| -------- |:-----------------------------------------------------------:|
| dev      | Utilizado pelos dev no momento de testes de desenvolvimento |
| test     | Utilizado pelo QA para validação do desenvolvimento         |
| prod     | Utilizado e mantido para a utilização em produção           |

---
## Utilização
Para a utilização do layer nos outros serviços é preciso adicionar a definição da função no ***serverless.yml***
```yaml
functions:
  hello:
    handler: src/handlers/handler.hello
    description: descrição da função.
    layers:
      - arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:layer:MiddyDependencies<***NOME DO LAYER***>-${self:provider.stage}:latest
    
    ...restante das configurações...
    
plugins:
  - "serverless-pseudo-parameters"
  - "serverless-layer-version-latest"
  - ...restante dos plugins...
```
---
Já dentro do arquivo do ***handler*** do serviço é necessário realizar o **require** do layer
```
const  validation  =  require('/opt/<nome_do_layer>')
```
O /opt sempre precisa existir, isso é a forma como a ***AWS*** trabalha ao montar o ambiente de execução do lambda

***Atenção!!!***
O nome utilizado no require é o mesmo nome do arquivo (***nome_do_layer.js***) definido dentro da pasta ***middy/***
```
module.exports = new layer()
```

## Autores
*  **Richard Ulisses Gabriel** - *Trabalho inicial*.