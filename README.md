<p align='center'>
  <img src="./public/images/logo.svg" alt="Logo">
 </p>
 
 
 # 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:
- [Context API](https://pt-br.reactjs.org/docs/context.html);
- [FaunaDB](https://fauna.com/);
- [Prismic CMS](https://prismic.io/);
- [ReactJS](https://pt-br.reactjs.org/);
- [SASS](https://sass-lang.com/);
- [Stripe - Plataforma de pagamento online](https://stripe.com/br);
- [Typescript](https://www.typescriptlang.org/).
- [Jest](https://jestjs.io/pt-BR/)

# 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/rogerrm95/ignews.git
$ cd ignews
```
Para iniciá-lo, siga os passos abaixo:
```bash
# Instalar as dependências
$ yarn

# Iniciar o projeto
$ yarn start
```
O app estará disponível no seu browser pelo endereço http://localhost:3000.

Lembrando que será necessário criar uma conta no FaunaDB, Prismic CMS e no Stipe além de configurar as seguintes variáveis ambientes no arquivo .env.local:
  ````bash
# API Key Stripe > No site criar uma empresa e acessar a aba Desenvolvedores
STRIPE_API_KEY= Disponível no canto direito após acessar Desenvolvedores
NEXT_PUBLIC_STRIPE_API_KEY= Disponível no canto direito após acessar Desenvolvedores
STRIPE_API_SUCCESS_URL= "URL da aplicação local em caso de sucesso"
STRIPE_API_CANCEL_URL= "URL da aplicação local em caso de erro"
STRIPE_WEBHOOKS_SECRET= Gerado ao executar strip login > stripe listen --forward-to URL/api/weebhooks 

# Github Auth > Configurar no GitHub > Settings > Developer settings > OAuth Apps > New OAuth App
GITHUB_ID= Gerado automaticamente após criar um OAuth App
GITHUB_SECRET= Gerado manualmente após clicar em "Generate a new client secret"

# Key FaunaDB
FAUNADB_KEY=  Gerado em Security > Keys > "New Key", após criar um BD

# Prismic CMS > Criar um repositório no dashboard e ir em Settings
PRISMIC_ACCESS_TOKEN= Gerado automaticamente em API Endpoint
PRISMIC_ENDPOINT= Criar um "Application name" e copiar o "Permanent access tokens"
````

# 💻 Projeto
Ignews é uma plataforma ideal para criadores de conteúdos poderem criar e publicar seus artigos científicos de maneira gratuita ou paga.
Esta aplicação utiliza o stripe para realizar a assinatura dos usuários que desejam pagar pelos artigos premium.
Utiliza também o Prismic CMS para possibilitar um melhor gerenciamento dos artigos desenvolvidos pelos criadores de conteúdos.

Este é um projeto desenvolvido durante o Bootcamp Ignite - Rocketseat | 2021.

Link para o projeto online: [Ig.News](https://ignews-pink.vercel.app/).

# 🔖 Layout
Você pode visualizar o layout do projeto através do link abaixo:
- [Layout Web](https://www.figma.com/file/L5vRj098FuxeRD8nTIFCR7/ig.news-v2.0) (Lembrando que você precisa ter uma conta no Figma).

## 📃 License
[MIT](https://choosealicense.com/licenses/mit/)
 
