import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IProduto from '../types/Produto';
import IUsuario from '../types/Usuario';
import ILogin from '../types/ILogin';
import { Observable } from 'rxjs';

// To use the environment configurations you have defined, your components must import the original environments file:
import { environment } from '../../environments/environment';
// This ensures that the build and serve commands can find the configurations for specific build targets.

// For example, the code `fetch(environment.urlAPI)` fetches from `http://my-prod-url` in production,
// and from `http://my-dev-url` in development. 
// Isso de acordo com o environment selecionado com o comando usado. `ng serve --configuration development`, `ng build --configuration production`, etc...
// Fonte: https://angular.dev/tools/cli/environments#using-environment-specific-variables-in-your-app

@Injectable({
    providedIn: 'root'
})
export class ChamadaAPIService {

    parametros: URLSearchParams = new URLSearchParams();
    body: object = {};
    private readonly urlApiUsuarios:string = environment.urlApiUsuarios;
    private readonly urlApiProdutos:string = environment.urlApiLoja;

    constructor(private http: HttpClient) { }

    /**
     * Sobre requisições http no Angular:
     * 
     * HttpClient has methods corresponding to the different HTTP verbs used to make requests, both to load data 
     * and to apply mutations on the server. Each method returns an RxJS Observable which, when subscribed, sends 
     * the request and then emits the results when the server responds.
     * 
     * Note: Observables created by HttpClient may be subscribed any number of times and will make a new backend request for each subscription.
     */

    login(dadosLogin: ILogin): Observable<HttpResponse<string>> {
        // console.log("dados login:", dadosLogin)
        return this.http.post<string>(this.urlApiUsuarios.concat("/auth/login"), dadosLogin, {observe: 'response'})
    }

    getProdutos(pagina = 1, qntTake = 10): Observable<HttpResponse<IProduto[]>> {
        console.log(environment.urlApiLoja);
        console.log(environment.urlApiUsuarios);
        return this.http.get<IProduto[]>(
            this.urlApiProdutos.concat("/api/produto"), 
            {
                observe: 'response', 
                params: {skip : qntTake*(pagina-1), take: qntTake}
            }
        )
    }

    getProdutoPorId(id: number): Observable<HttpResponse<IProduto>> {
        return this.http.get<IProduto>(this.urlApiProdutos.concat(`/api/produto/${id}`), {observe: 'response'})
    }

    // /api/produto/busca?filtroNome=produto1
    getProdutoPorNome(nome: string, pagina = 1, qntTake = 10): Observable<HttpResponse<IProduto[]>> {
        return this.http.get<IProduto[]>(
            this.urlApiProdutos.concat("/api/produto/buscapornome"), 
            {
                observe: 'response', 
                params: {filtroNome: nome, skip : qntTake*(pagina-1), take: qntTake}
            }
        )
    }

    // primeira página no spring boot é a 0
    getUsuarios(pagina = 0, qntTake = 10): Observable<HttpResponse<IUsuario[]>> {
        console.log(pagina, qntTake)
        return this.http.get<IUsuario[]>(
            this.urlApiUsuarios.concat("/usuarios"), 
            {
                observe: 'response', 
                params: {page : pagina, size: qntTake, sort: "id,desc"}
            }
        )
    }

    // /usuarios/buscapornome?nome=us&size=10&page=0 (primeira página no spring boot é a 0)
    getUsuarioPorNome(nome: string, pagina = 0, qntTake = 10): Observable<HttpResponse<IUsuario[]>> {
        return this.http.get<IUsuario[]>(
            this.urlApiUsuarios.concat("/usuarios/buscapornome"),
            {
                observe: 'response', 
                params: {nome: nome, size : qntTake*(pagina-1), page: pagina}
            }
        )
    }

    salvarNovoProduto(produto: IProduto, imagem: File|null): Observable<HttpResponse<IProduto>> {
        console.log(imagem)
        // TODO: Incluir imagem na request
        return this.http.post<IProduto>(this.urlApiProdutos.concat("/api/produto"), produto, {observe: "response", headers: {}})
    }
    
    salvarNovoUsuario(usuario: IUsuario) {
        return this.http.post<IUsuario>(this.urlApiUsuarios.concat("/usuarios"), usuario, {observe: "response", headers: {}})
    }

    atualizarProduto(id:number, produto: IProduto, imagem: File|null) {
        console.log(id)
        console.log(produto)
        console.log(imagem)
        return this.http.put<IProduto>(this.urlApiProdutos.concat(`/api/produto/${id}`), produto, {observe: "response", headers: {}})
    }

    atualizarUsuario(id: number, usuario: IUsuario) {
        return this.http.put<IUsuario>(this.urlApiUsuarios.concat(`/usuarios/${id}`), usuario, {observe: "response", headers: {}})
    }
    
    excluirProduto(id: number): Observable<HttpResponse<IProduto>> {
        return this.http.delete<IProduto>(this.urlApiProdutos.concat(`/api/produto/${id}`), {observe: "response", headers: {}})
    }

    desativarUsuario(id: number): Observable<HttpResponse<IUsuario>> {
        return this.http.delete<IUsuario>(this.urlApiUsuarios.concat(`/usuarios/${id}`), {observe: "response", headers: {}})
    }
}

// Sobre Services no Angular:
// https://www.alura.com.br/artigos/services-injecao-dependencia-angular-o-que-sao-como-funcionam