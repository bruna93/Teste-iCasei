
# iCasei | Desafio


## Apêndice

Solução do desafio de microfrontend utilizando HTML, CSS e TypeScript. A aplicação é dividida em duas partes principais: um sidebar e uma lista, cada uma desenvolvida como um microfrontend independente usando Vite.js com Vanilla + TypeScript. Integrei ambas na mesma página, garantindo comunicação fluida entre elas. Além disso, desenvolvi um backend em Node.js com TypeScript para fornecer dados e lógica de negócios, criando uma arquitetura completa e robusta.

## Stacks

**Qualidade de código:** Commitizen, ESLint, Jest, Prettier, TypeScript

**Aplicação:** HTML, CSS, TypeScript, Node.js, Micromodal.js

## Funcionalidades

- Navegação por rotas
- Busca e listagem de vídeos através da api do YouTube V3
- Listagem de favoritos

## Rodando localmente

Para rodar localmente será necessário rodar 4 aplicações de forma separada.

### APP Backend

A partir da pasta global, navegue até o backend
```bash
cd backend
```

Instale as dependências
```bash
npm install
```

Rode a aplicação
```bash
npm run dev
```

### APP MF Drawer

A partir da pasta global, navegue até o MF Drawer
```bash
cd microfrontends\mf_drawer
```

Instale as dependências
```bash
npm install
```

Rode a aplicação
```bash
npm run dev
```

### APP MF Videos

A partir da pasta global, navegue até o MF Videos
```bash
cd microfrontends\mf_videos
```

Instale as dependências
```bash
npm install
```

Rode a aplicação
```bash
npm run dev
```

### APP MF Main

A partir da pasta global, navegue até a aplicação principal
```bash
cd microfrontends\mf_app
```

Instale as dependências
```bash
npm install
```

Rode a aplicação
```bash
npm run dev
```

## Rodando os testes

Para rodar os testes do backend, rode o seguinte comando na pasta da aplicação.

```bash
  npm run test
```

## Autores

- [@bruna93](https://github.com/bruna93)
