export const environment = {
    production: true,
    development: false,
    urlApiLoja: 'http://<url_prod>:8080',
    urlApiUsuarios: 'http://<url_prod>:8081'
};

// esses environments são usados de acordo com os environments nas configurações angular.json, a partir dos
// comandos ng serve, ng build, ng test, etc...
// https://angular.dev/tools/cli/environments#configure-environment-specific-defaults