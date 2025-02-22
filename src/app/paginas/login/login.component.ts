import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChamadaAPIService } from '../../services/chamada-api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import ILogin from '../../types/ILogin';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule],
    standalone: true,
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    inputEmail = "";
    inputSenha = "";
    formLogin!: FormGroup; // gerencia o valor e a validação dos dados e estados de um formulário reativo\

    constructor (private router: Router, private servicoAPI: ChamadaAPIService) {}
    
    ngOnInit(): void {
        this.formLogin = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email]),
            senha: new FormControl("", Validators.required)
        });
    }

    login() {
        // const dadosLogin:ILogin = {email: this.formLogin.get("email")?.value, senha: this.formLogin.get("senha")?.value}
        this.servicoAPI.login(this.formLogin.value as ILogin).subscribe({
            next: response => console.log(response),
            error: error => console.error('Erro no Login: ', error)
        });
        
        // this.router.navigateByUrl("/home");
    }
}
