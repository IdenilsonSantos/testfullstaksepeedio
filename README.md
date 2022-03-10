 
 ​<h4 align="center"> 
 ​    <b>Encurtador de Urls</b>  
 ​</h4> 
  
 ​##​ ​Índice 
  
 ​-​ [​Sobre​](#sobre) 
 ​-​ [​Tecnologias​](#tecnologias) 
 ​-​ [​Como Instalar​](#instalar) 
  
 ​<a id="sobre"></a> 
  
 ​##​ ​Sobre 
  
 ​O sistema é um Encurtador de Url para teste dev, em melhoria. 
  
 ​<a id="tecnologias"></a> 
  
 ​##​ ​Tecnologias Utilizadas 
  
 ​O projeto foi desenvolvido utilizando as seguintes tecnologias. 
  
 ​-​ [​TypeScript​](https://www.typescriptlang.org/) 
 ​-​ [​Node.js​](https://nodejs.org/en/) 
 ​-​ [​ReactJS​](https://reactjs.org/) 
  
 ​<a id="instalar"></a> 
  
 ​##​ ​Como Instalar 
  
 ​-​ ### ​**Pré-requisitos** 
  
 ​  ​-​ Primeiro você ​**precisa**​ ter o ​**[​Node.js​](https://nodejs.org/en/)**​ instalado em sua  máquina. 
 ​  ​-​ Também é ​**preciso**​ ter um gerenciador de pacotes: ​**[​NPM​](https://www.npmjs.com/)**​ ou ​**[​Yarn​](https://yarnpkg.com/)**​. 
  
 ​1.​ Faça o clone do projeto : 
  
 ​```sh 
 ​  $ git clone https://github.com/IdenilsonSantos/testfullstaksepeedio.git 
 ​``` 
  
 ​2.​ Executando a Aplicação: 
  
 ​```sh 
 ​  ​#​ Instale as dependências 
 ​  $ npm install 
  
 ​  ​#​# Banco de dados 
 ​  $ ​alterar o arquivo na pasta Backend/config/database para a a sua url do banco de dados mongodb
  
 ​  ​#​ Inicie a API 
 ​  $ npm start
  
 ​  ​#​ Inicie a aplicação web 
 ​  $ ​cd​ web 
 ​  $ npm start 
 ​``` 
  
  
 ​##​ ​EndPoints Backend

##### Urls
- Post /url - Cria uma url passando os dados:
urlOrigin ( Url Original )
urlTitle ( Título da Url )

- Get /Url - Busca a Url pelo usuário, necessário token ou sem usuário sem necessidade de passar um header

- Get /Url/:id - Busca a Url pelo Id ( Hash ) 
- Get  /Url/views - Busca as Urls mais visitadas
- Del /Url/del/:id - Deleta Url pelo Id e pelo usuário atrelado a ela.

#### Users
- Post /register - Cria um usuário passando os dados:
name ( nome do usuário )
email ( email do usuário )
password ( Senha )

- Post /login Busca pelo usuário, gerando um token, necessário para outras requisições, com os dados:
Email e Password


  ​##​ ​Melhorias
O sistema ainda não está completo, devido ao pouco tempo que tive para desenvolver apresentando alguns bugs na chamada do redirecionamento da api.
  
 ​##​ ​License 
  
 ​Esse projeto está sob a licença MIT.
