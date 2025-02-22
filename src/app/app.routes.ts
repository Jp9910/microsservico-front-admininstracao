import { Routes } from '@angular/router';
import { FormProdutoComponent } from './componentes/form-produto/form-produto.component';
import { ProdutosComponent } from './paginas/produtos/produtos.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { FormUsuarioComponent } from './componentes/form-usuario/form-usuario.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { rotasGuard } from './guards/rotas.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full', // o path inteiro deve ser '' para dar match
        redirectTo: '/home'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [rotasGuard]
    },
    {
        path: 'produtos',
        component: ProdutosComponent,
        canActivate: [rotasGuard]
    },
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [rotasGuard]
    },
    {
        path: 'adicionarproduto',
        pathMatch: 'prefix',
        component: FormProdutoComponent,
        data: {titulo: "Adicionar Produto"},
        title: "Adicionar Produto",
        canActivate: [rotasGuard]
    },
    {
        path: 'editarproduto/:id',
        component: FormProdutoComponent,
        title: "Editar Produto",
        canActivate: [rotasGuard]
    },
    {
        path: 'adicionarusuario',
        pathMatch: 'prefix',
        component: FormUsuarioComponent,
        title: "Adicionar Usuário",
        canActivate: [rotasGuard]
    },
    {
        path: 'editarusuario/:id',
        component: FormUsuarioComponent,
        title: "Editar Usuario",
        canActivate: [rotasGuard]
    },
];

// pathMatch:
// 'prefix': Indica que a rota deve ser correspondida se a URL começa com o padrão definido na rota.
// 'full': Indica que a rota deve ser correspondida somente se a URL completa corresponder ao padrão definido na rota.