import { Component, signal, OnInit, Input } from '@angular/core';
import IProduto from '../../types/Produto';
import listaDeProdutos from '../../../assets/produtos.json';
import { FormsModule } from '@angular/forms';
import { ChamadaAPIService } from '../../services/chamada-api.service';
import { catchError, pipe, retry } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

console.log()
@Component({
    selector: 'app-tabela-produtos',
    imports: [FormsModule, RouterLink],
    standalone: true,
    templateUrl: './tabela-produtos.component.html'
})
export class TabelaProdutosComponent implements OnInit {
    produtos: IProduto[] = [];
    produtosFiltrados: IProduto[] = [];
    @Input() testeProp: string = "";
    filtroPorTexto: string = '';

    constructor(private servicoAPI: ChamadaAPIService) {}
    
    ngOnInit(): void {
        console.log(this.testeProp);
        this.getProdutos();
    }

    filtrarPorTexto(event: MouseEvent | Event): void {
        this.produtosFiltrados = this.produtos.filter((produto) => produto.nome.toLowerCase().includes(this.filtroPorTexto.toLowerCase()))
    }

    getProdutos() {
        this.produtos = listaDeProdutos;
        console.log("Buscando produtos...")
        this.servicoAPI.getProdutos()
            .pipe(retry(1), catchError(this.handleErroRequisicao))
            .subscribe((resposta) => {
                console.log(resposta)
                if (resposta.ok && resposta.body) {this.produtos = resposta.body}
            });        
        this.produtosFiltrados = this.produtos;
    }
    
    excluirProduto(event: MouseEvent, id: number): void {
        console.log("Excluindo produto...")
        this.servicoAPI.excluirProduto(id)
            .pipe(catchError(this.handleErroRequisicao))
            .subscribe((resposta) => {console.log(resposta)});
    }

    handleErroRequisicao(erro: HttpErrorResponse) {
        // alert("Erro ao processar requisição :(");
        console.error(erro)
        return []
    }
}
