# StockKeeper-Docker

> 
   <img src="http://img.shields.io/static/v1?label=STATUS&message=desenvolvendo&color=GREEN&style=for-the-badge"/>


:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação)

... 

### Descrição do projeto
<p>O projeto StockKeeper é uma API que pode ser usada para cadastrar produtos de uma determinada loja, tanto em formato json como xml.</p>
Esse projeto está sendo desenvolvido para fins de aprendizado e desenvolmimento profissional.

...

### Principais tecnologias

- TypeScript
- Docker-Compose
- NodeJs
- Express
- Jest
- Knex
- MySql
- POO

...
### Como rodar a aplicação

<details>
   <summary>Rodar a aplicação com Docker-Compose</summary>
   <p>
      Você precisa ter o <a href="https://docs.docker.com/engine/install/" target="_blank" >Docker</a> e o <a                                              href="https://docs.docker.com/compose/install/" target="_blank" >Docker-Compose</a> instalados em sua máquina.
   </p>
   <p>
      Copie o arquivo <a href="https://github.com/Programmer-Gabriel-Santos/Stock-Keeper-Docker/blob/master/docker-compose.yml" target="_blank">Docker-Compose.yml</a> para o diretório desejado, abra seu terminal e certifique-se de que está na mesma pasta que o arquivo. Use o comando 'docker-compose up', espere até que todos os containers estejam online.
   </p>
   <p>Serão criados três containers. O banco de dados Mysql rodando na porta 3007, o servidor rodando na porta 3008 e o gerenciador de banco de dados adminer na porta 3009. Certifique-se de que essas postas estão livres em seu host ou mude as portas definidas do docker-compose antes de criar os containers.</p>
   <p>Assim que o banco de dados estiver online, a aplicação criará as tabelas nescessárias e o usuário com permissão para inserir produtos no bando. A documentação de rotas e exemplos de requisições podem ser encontradas <a href="https://documenter.getpostman.com/view/21555755/2s93JqSkAT#intro">aqui</a>.</p>
</details>

##### observações

O projeto tem como objetivo principal desenvolver uma aplicação utilizando o dokcer-compose, por isso constam poucas opções de requisições. Porém, neste reporitório há outros projetos com mais recursos testáveis e manipulação de banco dedados.

Por isso é recomendado utilizar a conta padrão criada junto com a aplicação para fazer testes, se quiser criar mais contas para adicionar produtos, use o adminer para obter o id do usuário criado, você precisará dele para inserir produtos no banco, você também pode usar o administrador de banco de dados de sua preferência.

Aqui vai um exemplo de como utilizar o adminer: acesse o localhost:3009 de seu navegador e insira os dados como na imagem abaixo

<img src="https://user-images.githubusercontent.com/104647293/223822416-e194c187-bc27-4e46-bc7a-d78f667e378a.png" width="600px"/>



Siga os modelos de requisições que constam na documentação para evitar problemas.
...
