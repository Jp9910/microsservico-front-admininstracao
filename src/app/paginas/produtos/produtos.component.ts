import { Component } from '@angular/core';
import { TabelaProdutosComponent } from '../../componentes/tabela-produtos/tabela-produtos.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-produtos',
  imports: [TabelaProdutosComponent, RouterLink],
  standalone: true,
  templateUrl: './produtos.component.html'
})
export class ProdutosComponent {

}
