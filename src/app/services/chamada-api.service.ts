import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IProduto from '../types/Produto';
import IUsuario from '../types/Usuario';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChamadaAPIService {

    parametros: URLSearchParams = new URLSearchParams();
    body: object = {};
    private readonly urlApiUsuarios:string = "http://localhost:8080"; // TODO: parametrizar
    private readonly urlApiProdutos:string = "https://localhost:7285"; // TODO: parametrizar

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

    getProdutos(pagina = 1, qntTake = 10): Observable<HttpResponse<IProduto[]>> {
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
    
    getUsuarios(pagina = 1, qntTake = 10): Observable<HttpResponse<IUsuario[]>> {
        // return this.http.get<IUsuario[]>
        console.log(pagina, qntTake)
        return this.http.get<IUsuario[]>(
            this.urlApiUsuarios.concat("/usuarios"), 
            {
                observe: 'response', 
                params: {page : pagina, size: qntTake, sort: "id,desc"}
            }
        )
    }

    salvarNovoProduto(produto: IProduto, imagem: File|null): Observable<HttpResponse<IProduto>> {
        console.log(imagem)
        // TODO: Incluir imagem na request
        return this.http.post<IProduto>(this.urlApiProdutos.concat("/api/produto"), produto, {observe: "response", headers: {}})
    }
    
    salvarNovoUsuario() {
        console.log("salvar user")
    }

    atualizarProduto(id:number, produto: IProduto, imagem: File|null) {
        console.log(id)
        console.log(produto)
        console.log(imagem)
        return this.http.put<IProduto>(this.urlApiProdutos.concat(`/api/produto/${id}`), produto, {observe: "response", headers: {}})
    }

    atualizarUsuario() {
        console.log("atualizar user")
    }
    
    excluirProduto(id: number): Observable<HttpResponse<IProduto>> {
        return this.http.delete<IProduto>(this.urlApiProdutos.concat(`/api/produto/${id}`), {observe: "response", headers: {}})
    }

    excluirUsuario() {
        console.log("excluir user")
    }
}

// Sobre Services no Angular:
// https://www.alura.com.br/artigos/services-injecao-dependencia-angular-o-que-sao-como-funcionam