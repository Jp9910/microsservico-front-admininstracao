import { Routes } from '@angular/router';
import { FormAdicionarProdutoComponent } from './componentes/form-adicionar-produto/form-adicionar-produto.component';
import { ProdutosComponent } from './paginas/produtos/produtos.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';

export const routes: Routes = [
    {
        path: 'produtos',
        component: ProdutosComponent
    },
    {
        path: 'usuarios',
        component: UsuariosComponent
    },
    {
        path: 'adicionarproduto',
        pathMatch: 'prefix',
        component: FormAdicionarProdutoComponent
    },
    {
        path: '',
        pathMatch: 'full', // o path inteiro deve ser '' para dar match
        redirectTo: '/produtos'
    }
];

// pathMatch:
// 'prefix': Indica que a rota deve ser correspondida se a URL começa com o padrão definido na rota.
// 'full': Indica que a rota deve ser correspondida somente se a URL completa corresponder ao padrão definido na rota.