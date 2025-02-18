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
    body: Object = {};
    private readonly urlApiUsuarios:string = ""; // TODO: parametrizar
    private readonly urlApiProdutos:string = "https://localhost:7285";

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

    getProdutos(): Observable<HttpResponse<IProduto[]>> {
        return this.http.get<IProduto[]>(this.urlApiProdutos.concat("/api/produto"), {observe: 'response'})
    }

    getProduto(id: number): Observable<HttpResponse<IProduto>> {
        return this.http.get<IProduto>(this.urlApiProdutos.concat(`/api/produto/${id}`), {observe: 'response'})
    }
    
    getUsuarios() {
        // return this.http.get<IUsuario[]>
    }

    salvarNovoProduto(produto: IProduto, imagem: File|null): Observable<HttpResponse<IProduto>> {
        console.log(imagem)
        // TODO: Incluir imagem na request
        return this.http.post<IProduto>(this.urlApiProdutos.concat("/api/produto"), produto, {observe: "response", headers: {}})
    }
    
    salvarNovoUsuario() {
        
    }

    atualizarProduto(id:number, produto: IProduto, imagem: File|null) {
        console.log(id)
        console.log(produto)
        console.log(imagem)
        return this.http.put<IProduto>(this.urlApiProdutos.concat(`/api/produto/${id}`), produto, {observe: "response", headers: {}})
    }

    atualizarUsuario() {

    }
    
    excluirProduto(id: number): Observable<HttpResponse<IProduto>> {
        return this.http.delete<IProduto>(this.urlApiProdutos.concat(`/api/produto/${id}`), {observe: "response", headers: {}})
    }

    excluirUsuario() {

    }
}

// Sobre Services no Angular:
// https://www.alura.com.br/artigos/services-injecao-dependencia-angular-o-que-sao-como-funcionam