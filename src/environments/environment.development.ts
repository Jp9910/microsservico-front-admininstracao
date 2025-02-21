export const environment = {
    production: false,
    development: true,
    urlApiLoja: 'http://loja:8080', // nome do serviço no docker-compose
    urlApiUsuarios: 'http://autenticacao:8081'
};

// esses environments são usados de acordo com os environments nas configurações angular.json, a partir dos
// comandos ng serve, ng build, ng test, etc...
// https://angular.dev/tools/cli/environments#configure-environment-specific-defaults