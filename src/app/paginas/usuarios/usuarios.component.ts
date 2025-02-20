import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TabelaUsuariosComponent } from '../../componentes/tabela-usuarios/tabela-usuarios.component';

@Component({
    selector: 'app-usuarios',
    imports: [RouterLink, TabelaUsuariosComponent],
    standalone: true,
    templateUrl: './usuarios.component.html',
})
export class UsuariosComponent {
    // TODO: Implementar CRUD de usuários
}
