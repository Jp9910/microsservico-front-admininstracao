import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChamadaAPIService {

    urlAPI: string = "";
    parametros: URLSearchParams = new URLSearchParams();
    body: Object = {};

    constructor() { }

    // método mais generico iria precisar receber url, parametros e body da requisição
    chamarAPI() {
        console.log("fazer o fetch na api")
    }
    
    salvarNovoProduto() {
        console.log("fazer o post pra api de produto")
        alert("implementar post pra api de produto")
    }
    
    salvarNovoUsuario() {
        console.log("fazer o post pra api de usuario")
    }
}

// Sobre Services no Angular:
// https://www.alura.com.br/artigos/services-injecao-dependencia-angular-o-que-sao-como-funcionam