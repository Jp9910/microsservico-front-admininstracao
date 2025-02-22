import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiUsuariosService } from '../../services/api-usuarios.service';
import IUsuario from '../../types/Usuario';


@Component({
    selector: 'app-form-usuario',
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    standalone: true,
    templateUrl: './form-usuario.component.html'
})
export class FormUsuarioComponent implements OnInit{
    formUsuario!: FormGroup;
    formEnviado = false;
    idUsuario: string|null = null;
    @Input() tituloFormulario?: string = "";


    // injetar a dependencia do service no componente pelo construtor
    constructor (private servicoAPI: ApiUsuariosService, private activatedRoute: ActivatedRoute) { }

    // ngOnInit() é executado quando o componente é criado
    ngOnInit(): void {
        console.log(this.activatedRoute.snapshot.data['titulo']) // Vem do app.routes.ts
        this.tituloFormulario = this.activatedRoute.snapshot.title // Vem do app.routes.ts
        this.idUsuario = this.activatedRoute.snapshot.paramMap.get('id'); // só vai existir se for na url de edição de usuario
        console.log("Id usuário: "+this.idUsuario);
        this.formUsuario = new FormGroup({
            nome: new FormControl('', Validators.required),
            email: new FormControl("", [Validators.required, Validators.email]),
            senha: new FormControl(''),
            isAdmin: new FormControl(true, Validators.required)
        });
        if (this.idUsuario) {this.getUsuario();} // popular informações do formulário de edição
    }


    adicionarUsuario() {
        console.log("Adicionando usuário...")
        if (this.formUsuario.get('isAdmin')?.value === true) {
            console.log("Adicionando admin...")
            this.servicoAPI.salvarNovoUsuarioAdmin(this.formUsuario.value as IUsuario).subscribe(() => {
                alert("Usuário salvo!")
                this.limparFormulario();
            });
        }
        
        if (this.formUsuario.get('isAdmin')?.value === false) {
            console.log("Adicionando não-admin...")
            this.servicoAPI.salvarNovoUsuario(this.formUsuario.value as IUsuario).subscribe(() => {
                alert("Usuário salvo!")
                this.limparFormulario();
            });
        }
    }

    editarUsuario(): void {
        console.log("Editando usuário...")
        this.servicoAPI.atualizarUsuario(parseInt(this.idUsuario!), this.formUsuario.value as IUsuario)
            .pipe(catchError(this.handleErroRequisicao))
            .subscribe((resposta) => {
                console.log(resposta)
                alert("Usuário atualizado!")
            });
    }

    adicionarOuEditarUsuario(): void {
        this.formEnviado = true;
        if (this.idUsuario && this.formUsuario.valid) {
            return this.editarUsuario()
        }
        if (!this.idUsuario && this.formUsuario.valid) {
            return this.adicionarUsuario()
        }
        if (this.formUsuario.invalid) {
            alert("Não foi possível salvar o usuário. Alguns dados no formulários estão inválidos.")
        }
    }

    limparFormulario() {
        this.formEnviado = false;
        this.formUsuario.reset();
    }

    getUsuario() {
        if (this.idUsuario) {
            this.servicoAPI.getUsuarioPorId(this.idUsuario)
                .subscribe((usuario) => {
                    console.log(usuario.body)
                    if(usuario.body) {this.formUsuario.patchValue(usuario.body);}
                });
        }
    }

    handleErroRequisicao(erro: HttpErrorResponse) {
        // alert("Erro ao processar requisição :(");
        console.error(erro)
        return []
    }
}
