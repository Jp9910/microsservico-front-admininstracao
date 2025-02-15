import { Component, signal, OnInit } from '@angular/core';
import IProduto from '../../types/Produto';
import listaDeProdutos from '../../../assets/produtos.json';
import { FormsModule } from '@angular/forms';

console.log()
@Component({
    selector: 'app-tabela-produtos',
    imports: [FormsModule],
    standalone: true,
    templateUrl: './tabela-produtos.component.html'
})
export class TabelaProdutosComponent {
    produtos: IProduto[] = listaDeProdutos;
    // produtosFiltrados = computed(() => this.filtrarPorTexto())
    // produtosFiltrados = signal(this.produtos);
    produtosFiltrados: IProduto[] = listaDeProdutos;

    filtroPorTexto: string = '';

    filtrarPorTexto() {
        this.produtosFiltrados = this.produtos.filter((produto) => produto.nome.toLowerCase().includes(this.filtroPorTexto.toLowerCase()))
    }

    ngOnInit(): void {
        console.log("asdf")
    }
}
