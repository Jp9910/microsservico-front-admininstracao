import { Injectable } from '@angular/core';
import ILogin from '../types/Login';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import IUsuario from '../types/Usuario';
import { TokenService } from './token.service';
import IPagina from '../types/Pagina';

@Injectable({
    providedIn: 'root'
})
export class ApiUsuariosService {

    private readonly urlApiUsuarios:string = environment.urlApiUsuarios;

    constructor(private http: HttpClient, private usuarioService: UsuarioService, private tokenService: TokenService) { }

    login(dadosLogin: ILogin): Observable<HttpResponse<{ token: string }>> {
        // console.log("dados login:", dadosLogin)
        return this.http.post<{ token: string }>(this.urlApiUsuarios.concat("/auth/login"), dadosLogin, { observe: 'response' })
            // salvar token no local storage
            .pipe(
                tap((response) => {
                    console.log(response)
                    const token = response.body?.token || "";
                    this.usuarioService.salvarToken(token);
                })
            )
    }

    getUsuarios(pagina = 1, qntTake = 10): Observable<HttpResponse<{content: IUsuario[], page: IPagina}>> {
        console.log(pagina, qntTake)
        pagina -= 1; // primeira página no spring boot é a 0
        return this.http.get<{content: IUsuario[], page: IPagina}>(
            this.urlApiUsuarios.concat("/usuarios"),
            {
                observe: 'response',
                params: { page: pagina, size: qntTake, sort: "id,desc" },
                // headers: {"Authentication": `Bearer ${this.tokenService.getToken()}`}
            }
        )
    }

    getUsuarioPorId(id: string): Observable<HttpResponse<IUsuario>> {
        return this.http.get<IUsuario>(this.urlApiUsuarios.concat(`/usuarios/${id}`), { observe: 'response' })
    }

    // /usuarios/buscapornome?nome=us&size=10&page=0 (primeira página no spring boot é a 0)
    getUsuarioPorNome(nome: string, pagina = 0, qntTake = 10): Observable<HttpResponse<{content: IUsuario[], page: IPagina}>> {
        return this.http.get<{content: IUsuario[], page: IPagina}>(
            this.urlApiUsuarios.concat("/usuarios/buscapornome"),
            {
                observe: 'response',
                params: { nome: nome, size: qntTake * (pagina - 1), page: pagina }
            }
        )
    }

    salvarNovoUsuario(usuario: IUsuario) {
        return this.http.post<IUsuario>(this.urlApiUsuarios.concat("/usuarios/cadastrar"), usuario, { observe: "response", headers: {} })
    }

    salvarNovoUsuarioAdmin(usuario: IUsuario) {
        return this.http.post<IUsuario>(this.urlApiUsuarios.concat("/usuarios/cadastraradmin"), usuario, { observe: "response", headers: {} })
    }

    atualizarUsuario(id: number, usuario: IUsuario) {
        return this.http.put<IUsuario>(this.urlApiUsuarios.concat(`/usuarios/${id}`), usuario, { observe: "response", headers: {} })
    }

    desativarUsuario(id: number): Observable<HttpResponse<IUsuario>> {
        return this.http.delete<IUsuario>(this.urlApiUsuarios.concat(`/usuarios/${id}`), { observe: "response", headers: {} })
    }
}
