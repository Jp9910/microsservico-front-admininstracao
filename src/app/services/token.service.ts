import { Injectable } from '@angular/core';

const KEY = "token"

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    // Sobre onde guardar o token: https://stackoverflow.com/a/48714123/18552279
    salvarToken(token: string) {
        return localStorage.setItem(KEY, token);
    }

    excluirToken() {
        return localStorage.removeItem(KEY);
    }

    getToken() {
        return localStorage.getItem(KEY) ?? "";
    }

    possuiToken() {
        return !!this.getToken();
    }
}
