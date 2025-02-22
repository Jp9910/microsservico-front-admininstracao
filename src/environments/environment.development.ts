export const environment = {
    production: false,
    development: true,
    urlApiLoja: 'http://localhost:8080', 
    urlApiUsuarios: 'http://localhost:8081'
    // Mesmo no docker-compose, a url vai ser localhost pq o ng serve ta servindo pra 0.0.0.0. É como se 
    // tivesse servindo a partir da própria máquina local (?) não tenho certeza como nem porque, mas aparentemente funciona
};

// esses environments são usados de acordo com os environments nas configurações angular.json, a partir dos
// comandos ng serve, ng build, ng test, etc...
// https://angular.dev/tools/cli/environments#configure-environment-specific-defaults