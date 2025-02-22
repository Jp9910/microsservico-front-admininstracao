import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import IUsuario from '../types/Usuario';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private usuarioSubject = new BehaviorSubject<IUsuario | null>(null);

    constructor(private tokenService: TokenService) {
        console.log("teste")
        if (this.tokenService.possuiToken()) {
            this.decodificarJWT();
        }
    }

    decodificarJWT() {
        const decodificado = jwtDecode(this.tokenService.getToken());
        console.log(decodificado);
        const usuario = decodificado as IUsuario;
        this.usuarioSubject.next(usuario); // emitir o usuário decodificado
    }

    getUsuario() {
        return this.usuarioSubject.asObservable();
    }

    salvarToken(token: string) {
        this.tokenService.salvarToken(token);
        this.decodificarJWT();
    }

    logout() {
        this.tokenService.excluirToken();
        this.usuarioSubject.next(null); // emitir que o usuário foi deslogado
    }

    estaLogado() {
        return this.tokenService.possuiToken();
    }
}
