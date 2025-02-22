import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IProduto from '../types/Produto';
import { Observable } from 'rxjs';

// To use the environment configurations you have defined, your components must import the original environments file:
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { TokenService } from './token.service';
// This ensures that the build and serve commands can find the configurations for specific build targets.

// For example, the code `fetch(environment.urlAPI)` fetches from `http://my-prod-url` in production,
// and from `http://my-dev-url` in development.
// Isso de acordo com o environment selecionado com o comando usado. `ng serve --configuration development`, `ng build --configuration production`, etc...
// Fonte: https://angular.dev/tools/cli/environments#using-environment-specific-variables-in-your-app

@Injectable({
    providedIn: 'root'
})
export class ApiLojaService {

    private readonly urlApiProdutos: string = environment.urlApiLoja;

    constructor(private http: HttpClient, private usuarioService: UsuarioService, private tokenService: TokenService) { }

    /**
     * Sobre requisições http no Angular:
     *
     * HttpClient has methods corresponding to the different HTTP verbs used to make requests, both to load data
     * and to apply mutations on the server. Each method returns an RxJS Observable which, when subscribed, sends
     * the request and then emits the results when the server responds.
     *
     * Note: Observables created by HttpClient may be subscribed any number of times and will make a new backend request for each subscription.
     */

    getProdutos(pagina = 1, qntTake = 10): Observable<HttpResponse<IProduto[]>> {
        console.log(environment.urlApiLoja);
        console.log(environment.urlApiUsuarios);
        return this.http.get<IProduto[]>(
            this.urlApiProdutos.concat("/api/produto"),
            {
                observe: 'response',
                params: { skip: qntTake * (pagina - 1), take: qntTake }
            }
        )
    }

    getProdutoPorId(id: number): Observable<HttpResponse<IProduto>> {
        return this.http.get<IProduto>(this.urlApiProdutos.concat(`/api/produto/${id}`), { observe: 'response' })
    }

    // /api/produto/busca?filtroNome=produto1
    getProdutoPorNome(nome: string, pagina = 1, qntTake = 10): Observable<HttpResponse<IProduto[]>> {
        return this.http.get<IProduto[]>(
            this.urlApiProdutos.concat("/api/produto/buscapornome"),
            {
                observe: 'response',
                params: { filtroNome: nome, skip: qntTake * (pagina - 1), take: qntTake }
            }
        )
    }

    salvarNovoProduto(produto: IProduto, imagem: File | null): Observable<HttpResponse<IProduto>> {
        console.log(imagem)
        // TODO: Incluir imagem na request
        return this.http.post<IProduto>(this.urlApiProdutos.concat("/api/produto"), produto, { observe: "response", headers: {} })
    }

    atualizarProduto(id: number, produto: IProduto, imagem: File | null) {
        console.log(id)
        console.log(produto)
        console.log(imagem)
        return this.http.put<IProduto>(this.urlApiProdutos.concat(`/api/produto/${id}`), produto, { observe: "response", headers: {} })
    }

    excluirProduto(id: number): Observable<HttpResponse<IProduto>> {
        return this.http.delete<IProduto>(this.urlApiProdutos.concat(`/api/produto/${id}`), { observe: "response", headers: {} })
    }

}

// Sobre Services no Angular:
// https://www.alura.com.br/artigos/services-injecao-dependencia-angular-o-que-sao-como-funcionam