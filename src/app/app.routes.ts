import { Routes } from '@angular/router';
import { FormProdutoComponent } from './componentes/form-produto/form-produto.component';
import { ProdutosComponent } from './paginas/produtos/produtos.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { FormUsuarioComponent } from './componentes/form-usuario/form-usuario.component';
import { HomeComponent } from './paginas/home/home.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
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
        component: FormProdutoComponent,
        data: {titulo: "Adicionar Produto"},
        title: "Adicionar Produto"
    },
    {
        path: 'editarproduto/:id',
        component: FormProdutoComponent,
        title: "Editar Produto"
    },
    {
        path: '',
        pathMatch: 'full', // o path inteiro deve ser '' para dar match
        redirectTo: '/home'
    },
    {
        path: 'adicionarusuario',
        pathMatch: 'prefix',
        component: FormUsuarioComponent,
        title: "Adicionar Usuário"
    }
];

// pathMatch:
// 'prefix': Indica que a rota deve ser correspondida se a URL começa com o padrão definido na rota.
// 'full': Indica que a rota deve ser correspondida somente se a URL completa corresponder ao padrão definido na rota.