import { Component, signal, OnInit, Input } from '@angular/core';
import IProduto from '../../types/Produto';
import listaDeProdutos from '../../../assets/produtos.json';
import { FormsModule } from '@angular/forms';
import { ChamadaAPIService } from '../../services/chamada-api.service';

console.log()
@Component({
    selector: 'app-tabela-produtos',
    imports: [FormsModule],
    standalone: true,
    templateUrl: './tabela-produtos.component.html'
})
export class TabelaProdutosComponent {
    produtos: IProduto[] = [];
    produtosFiltrados: IProduto[] = [];
    @Input() testeProp: string = "";
    filtroPorTexto: string = '';

    constructor(private servicoAPI: ChamadaAPIService) {}
    
    ngOnInit(): void {
        console.log(this.testeProp);
        this.getProdutos();
    }

    getProdutos() {
        this.servicoAPI.getProdutos().subscribe((resposta) => {
            console.log(resposta)
            if (resposta.ok && resposta.body) {this.produtos = resposta.body}
            if (!resposta.ok) {this.produtos = listaDeProdutos}
            this.produtosFiltrados = this.produtos;
        })
    }

    filtrarPorTexto(event: MouseEvent | Event): void {
        this.produtosFiltrados = this.produtos.filter((produto) => produto.nome.toLowerCase().includes(this.filtroPorTexto.toLowerCase()))
    }
}
