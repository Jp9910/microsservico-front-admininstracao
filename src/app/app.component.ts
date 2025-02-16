import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './componentes/container/container.component';
import { TabelaProdutosComponent } from './componentes/tabela-produtos/tabela-produtos.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { FormAdicionarProdutoComponent } from "./componentes/form-adicionar-produto/form-adicionar-produto.component";

@Component({
    selector: 'app-root',
    imports: [
    ContainerComponent,
    TabelaProdutosComponent,
    FormAdicionarProdutoComponent
],
    standalone: true,
    templateUrl: './app.component.html'
})
export class AppComponent {
    title: string = 'Loja - Administração';

    ngOnInit(): void {
        console.log("`ngOnInit()` é executada assim que o componente for carregado")
    }
}
