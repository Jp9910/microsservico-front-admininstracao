import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { catchError, retry } from 'rxjs';
import { ChamadaAPIService } from '../../services/chamada-api.service';
import IProduto from '../../types/Produto';
// import listaDeProdutos from '../../../assets/produtos.json';

console.log()
@Component({
    selector: 'app-tabela-produtos',
    imports: [FormsModule, RouterLink],
    standalone: true,
    templateUrl: './tabela-produtos.component.html'
})
export class TabelaProdutosComponent implements OnInit {
    produtos: IProduto[] = [];
    estaUsandoFiltro = false;
    @Input() testeProp = "";
    filtroPorTexto = '';
    paginaTabela = 1;
    qntProdutosPorPagina = 10;

    constructor(private servicoAPI: ChamadaAPIService) {}
    
    ngOnInit(): void {
        console.log(this.testeProp);
        this.getProdutos();
    }

    filtrarPorNome(/*event: MouseEvent | Event*/): void {
        if (this.filtroPorTexto === "" && this.estaUsandoFiltro) {
            return this.getProdutos();
        }

        if (this.filtroPorTexto !== "") {
            console.log("Buscando produtos por nome...");
            this.estaUsandoFiltro = true;
            this.paginaTabela = 1;
            this.getProdutosPorNome();
        }
    }

    getProdutosPorNome() {
        this.servicoAPI.getProdutoPorNome(this.filtroPorTexto.toLowerCase(), this.paginaTabela, this.qntProdutosPorPagina)
            .pipe(catchError(this.handleErroRequisicao))
            .subscribe((resposta) => {
                console.log(resposta)
                if (resposta.ok && resposta.body) {this.produtos = resposta.body}
            });
    }

    proximaPagina() {
        if (this.produtos.length > 0 && (!this.estaUsandoFiltro || this.filtroPorTexto === "")) {
            this.paginaTabela += 1;
            this.getProdutos();
        }
        if (this.produtos.length > 0 && this.estaUsandoFiltro && this.filtroPorTexto !== "") {
            this.paginaTabela += 1;
            this.getProdutosPorNome();
        }
    }

    paginaAnterior() {
        if (this.paginaTabela > 1 && (!this.estaUsandoFiltro || this.filtroPorTexto === "")) {
            this.paginaTabela -= 1;
            this.getProdutos();
        }
        if (this.paginaTabela > 1 && this.estaUsandoFiltro && this.filtroPorTexto !== "") {
            this.paginaTabela -= 1;
            this.getProdutosPorNome();
        }
    }

    getProdutos() {
        if (this.estaUsandoFiltro) {this.paginaTabela = 1;}
        this.estaUsandoFiltro = false;
        console.log("Buscando produtos...")
        console.log(this.paginaTabela)
        this.servicoAPI.getProdutos(this.paginaTabela, this.qntProdutosPorPagina)
            .pipe(retry(1), catchError(this.handleErroRequisicao))
            .subscribe((resposta) => {
                console.log(resposta)
                if (resposta.ok && resposta.body) {this.produtos = resposta.body}
            });
    }
    
    excluirProduto(id: number): void {
        console.log("Excluindo produto...")
        this.servicoAPI.excluirProduto(id)
            .pipe(catchError(this.handleErroRequisicao))
            .subscribe((resposta) => {
                console.log(resposta);
                this.getProdutos()
            });
    }

    handleErroRequisicao(erro: HttpErrorResponse) {
        // alert("Erro ao processar requisição :(");
        // this.produtos = listaDeProdutos;
        console.log(this.produtos)
        console.error(erro)
        return []
    }
}
