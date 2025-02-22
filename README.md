# Microsservico - Front Administracao

## Iniciar o serviço localmente

Instalar a CLI do angular na máquina caso não tenha:

> npm install -g @angular/cli

Iniciar o serviço em desenvolvimento local (inicia apenas o serviço do front, então requisições a outros serviços não funcionarão):

> npm install && npm run start



## Iniciar o serviço com Docker
Iniciar o serviço em desenvolvimento em containers (inicia todos os serviços necessários, então requisições devem funcionar):
1. Criar arquivos de ambiente 
- `.senhapostgresauth.txt`;
- `.senhapostgresloja.txt`;
- `env.api-loja`;
- `env.api-autenticacao`, que contêm configurações dos serviços de autenticação e loja e seus BDs.

2. Executar `docker-compose up --build`

## Usar o pipeline de CI rústico:
 1. Instalar a ferramenta make
 2. Executar `make ci` na raiz do projeto (que executará `ng lint` e `ng test`)

___
___

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```
