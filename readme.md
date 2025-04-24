# API CRUD DE USUÁRIOS

![](https://img.shields.io/badge/typescript-gray?logo=typescript) ![](https://img.shields.io/badge/express-gray?logo=express) ![](https://img.shields.io/badge/prisma_ORM-gray?logo=prisma) ![](https://img.shields.io/badge/sqlite_database-gray?logo=sqlite) ![](https://img.shields.io/badge/gihub-gray?logo=github) ![](https://img.shields.io/badge/yarn-gray?logo=yarn)

O objetivo dessa api é servir de suporte para o desenvolvimento e validação da biblioteca [express-generate-swagger](https://www.npmjs.com/package/express-generate-swagger?activeTab=readme "express-generate-swagger") hospedada no Gerenciador de Pacotes NPM, o código fonte pode ser encontrado no [Github](https://github.com/RafaelCastro1002/express-swagger-doc-generator "Github").

Para validar e testar a biblioteca conto com sua colaboração, foi pensado em algo simples e rápido, divido em 2 etapas, primeiro você construir a documentação swagger de forma tradicional escrevendo o arquivo json/yml e após instalar a biblioteca [express-generate-swagger](https://www.npmjs.com/package/express-generate-swagger?activeTab=readme "express-generate-swagger") gerar a documentação swagger.
**Para facilitar vou deixar aqui um [Formulário do Google](http://google.com.br "Formulário do Google") que contém maiores detalhes sobre como proceder com o teste e também pronto para colher seu feedback.**

---

### Instalação

- Para rodar o projeto é necessário o **.env** arquivo:
  `DATABASE_URL="file:./dev.db"` <-- usado para especificar o caminho para o banco de dados sqlite.
- Instale as dependências:
  `yarn install`
- Gere o prisma client diretório:
  `npx prisma generate`
- Rode a migration do prisma para criar a estrutura de banco de dados de acordo com o modelo:
  `npx prisma migrate dev`
- Por fim, execute o projeto:
  `yarn dev`

### Endpoints

- ![](https://img.shields.io/badge/POST-green) **/users/story**: Cadastro de usuários com validação de entrada

      nome: string
      email: string
      phone?: string

- ![](https://img.shields.io/badge/GET-blue) **/users**: Listagem de usuários

- ![](https://img.shields.io/badge/GET-blue) **/users/:uuid**: Pegar usuário por id
- ![](https://img.shields.io/badge/PUT-yellow) **/users/:uuid**: Edita usuário

      nome: string
      email: string
      phone?: string

- ![](https://img.shields.io/badge/DELETE-red) **/users/:uuid**: Deleta usuário
