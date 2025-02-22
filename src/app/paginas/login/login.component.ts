import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import ILogin from '../../types/Login';
import { ApiUsuariosService } from '../../services/api-usuarios.service';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule],
    standalone: true,
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    inputEmail = "";
    inputSenha = "";
    loginIncorreto = false;
    formLogin!: FormGroup; // gerencia o valor e a validação dos dados e estados de um formulário reativo\

    constructor (private router: Router, private servicoAPI: ApiUsuariosService) {}
    
    ngOnInit(): void {
        this.formLogin = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email]),
            senha: new FormControl("", Validators.required)
        });
    }

    login() {
        // const dadosLogin:ILogin = {email: this.formLogin.get("email")?.value, senha: this.formLogin.get("senha")?.value}
        this.servicoAPI.login(this.formLogin.value as ILogin).subscribe({
            next: response => {
                this.loginIncorreto = false;
                console.log(response)
                console.log("Login Realizado com Sucesso")
                this.router.navigateByUrl("/home");
                // O armazenamento do token é feito pelo usuario.service.ts
            },
            error: error => {
                console.error('Erro no Login: ', error)
                this.loginIncorreto = true;
            }
        });        
    }
}
