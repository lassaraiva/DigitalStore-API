# Digital Store-API
Digital Store API é uma aplicação web desenvolvida em Node.js. É o backend, ainda não implementado, para (https://github.com/lassaraiva/DigitalStore), e utiliza diversas tecnologias modernas para fornecer uma plataforma robusta e escalável. O projeto integra com bancos de dados e serviços para oferecer uma experiência completa de gerenciamento de dados.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para Node.js que suporta vários bancos de dados SQL.
- **MySQL / PostgreSQL**: Bancos de dados relacionais suportados.
- **Supabase**: Plataforma backend como serviço.
- **bcryptjs**: Biblioteca para hashing de senhas.
- **jsonwebtoken**: Biblioteca para criação e verificação de tokens JWT.
- **dotenv**: Gerenciador de variáveis de ambiente.
- **cors**: Middleware para permitir solicitações de origens cruzadas.
- **body-parser**: Middleware para parsear corpos de requisição.
- **nodemon**: Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento
  
## Funcionalidades

A aplicação oferece operações básicas de CRUD para gerenciar recursos. Os endpoints específicos para essas operações são definidos na sua aplicação e podem variar conforme a estrutura dos recursos gerenciados. Verifique os arquivos de rotas para detalhes sobre os endpoints e parâmetros disponíveis.

## Estrutura do Projeto

- **app.js**: Arquivo principal de configuração e inicialização do aplicativo.
- **api/**: Contém a lógica da API e rotas do aplicativo.
- **models/**: Contém os modelos do Sequelize para interação com o banco de dados.
- **config/**: Configurações gerais e inicializações.
- **middlewares/**: Middlewares personalizados.
- **utils/**: Funções utilitárias e helpers.

## Configure suas variáveis de ambiente:

Crie um arquivo .env na raiz do projeto e adicione suas variáveis de ambiente.

## Instalação

Para configurar o projeto em seu ambiente local, siga estas instruções:

### Pré-requisitos

Certifique-se de que você tenha o Node.js e o npm (ou yarn) instalados em sua máquina. Você pode baixar o Node.js [aqui](https://nodejs.org/).

### Passos de Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/lassaraiva/DigitalStore-API.git
2. **Navegue para o diretório do projeto**
   ```bash
   cd DigitalStore-API
3. **Instale as dependências**

   Se estiver usando npm:
   ```bash
   npm install
   ```
   Se estiver usando yarn:
   ```bash
   yarn install
   ```

4. **Rode o projeto**
   
   Se estiver usando npm:
   ```bash
   npm start
   ```
   Se estiver usando yarn:
   ```bash
   yarn start
   
5. **Acesse o projeto**

   Após rodar o projeto, você pode acessá-lo no seu navegador em:
   ```bash
   http://localhost:3000
