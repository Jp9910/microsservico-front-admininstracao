import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import IUsuario from '../../types/Usuario';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiUsuariosService } from '../../services/api-usuarios.service';

@Component({
    selector: 'app-tabela-usuarios',
    imports: [FormsModule, RouterLink],
    standalone: true,
    templateUrl: './tabela-usuarios.component.html',
})
export class TabelaUsuariosComponent implements OnInit {
    usuarios: IUsuario[] = [];
    estaUsandoFiltro = false;
    filtroPorTexto = '';
    paginaTabela = 1;
    qntUsuariosPorPagina = 10;

    constructor(private servicoAPI: ApiUsuariosService) { }

    ngOnInit(): void {
        this.getUsuarios();
    }

    filtrarPorNome(): void {
        if (this.filtroPorTexto === "" && this.estaUsandoFiltro) {
            return this.getUsuarios();
        }

        if (this.filtroPorTexto !== "") {
            console.log("Buscando usuarios por nome...");
            this.estaUsandoFiltro = true;
            this.paginaTabela = 1;
            this.getUsuariosPorNome();
        }
    }

    getUsuariosPorNome() {
        this.servicoAPI.getUsuarioPorNome(this.filtroPorTexto.toLowerCase(), this.paginaTabela, this.qntUsuariosPorPagina)
            .pipe(catchError(this.handleErroRequisicao))
            .subscribe((resposta) => {
                console.log(resposta)
                if (resposta.ok && resposta.body) { this.usuarios = resposta.body.content }
            });
    }

    proximaPagina() {
        if (this.usuarios.length > 0 && (!this.estaUsandoFiltro || this.filtroPorTexto === "")) {
            this.paginaTabela += 1;
            this.getUsuarios();
        }
        if (this.usuarios.length > 0 && this.estaUsandoFiltro && this.filtroPorTexto !== "") {
            this.paginaTabela += 1;
            this.getUsuariosPorNome();
        }
    }

    paginaAnterior() {
        if (this.paginaTabela > 1 && (!this.estaUsandoFiltro || this.filtroPorTexto === "")) {
            this.paginaTabela -= 1;
            this.getUsuarios();
        }
        if (this.paginaTabela > 1 && this.estaUsandoFiltro && this.filtroPorTexto !== "") {
            this.paginaTabela -= 1;
            this.getUsuariosPorNome();
        }
    }

    getUsuarios() {
        if (this.estaUsandoFiltro) { this.paginaTabela = 1; }
        this.estaUsandoFiltro = false;
        console.log("Buscando usuarios...")
        console.log(this.paginaTabela)
        this.servicoAPI.getUsuarios(this.paginaTabela, this.qntUsuariosPorPagina)
            .pipe(/*retry(1),*/ catchError(this.handleErroRequisicao))
            .subscribe((resposta) => {
                console.log(resposta)
                if (resposta.ok && resposta.body) { this.usuarios = resposta.body.content }
            });
    }

    desativarUsuario(id: number): void {
        console.log("Excluindo usuario...")
        this.servicoAPI.desativarUsuario(id)
            .pipe(catchError(this.handleErroRequisicao))
            .subscribe((resposta) => {
                console.log(resposta);
                this.getUsuarios()
            });
    }

    handleErroRequisicao(erro: HttpErrorResponse) {
        // alert("Erro ao processar requisição :(");
        // this.usuarios = listaDeUsuarios;
        // console.log(this.usuarios)
        console.error(erro)
        return []
    }
}
