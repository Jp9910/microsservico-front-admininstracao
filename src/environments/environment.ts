export const environment = {
    production: true,
    development: false,
    urlApiLoja: '',
    urlApiUsuarios: ''
    // Quem vai executar o código do front é o browser, então ele não vai conseguir resolver o nome do container que ta dentro do
    // compose, "api-loja" por exemplo. 
    // Então as requests precisam ser para endereços de recursos apenas. 
    // Então "/api/produto" em vez de "http://api-loja:8080/api/produto"
    // Nos navegadores, caso o fetch não tenha o endereço+porta, será presumido o endereço+porta do site atual
    // Então no site "http://localhost:4200", um fetch(/api/teste) vai ser para "http://localhost:4200/api/teste"
    // Fonte: https://stackoverflow.com/a/77060234/18552279
};

// esses environments são usados de acordo com os environments nas configurações angular.json, a partir dos
// comandos ng serve, ng build, ng test, etc...
// https://angular.dev/tools/cli/environments#configure-environment-specific-defaults