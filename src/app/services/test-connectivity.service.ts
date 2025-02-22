import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TestConnectivityService {
    private readonly urlApiLoja: string = environment.urlApiLoja;
    private readonly urlApiUsuarios: string = environment.urlApiUsuarios;

    constructor(private http: HttpClient) { }

    testApiLoja() {
        return this.http.get(this.urlApiLoja.concat('/api/produto'));
    }

    testApiUsuarios() {
        return this.http.get(this.urlApiUsuarios.concat('/usuarios'));
    }
}
