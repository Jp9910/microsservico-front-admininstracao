import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TabelaUsuariosComponent } from '../../componentes/tabela-usuarios/tabela-usuarios.component';
import { UsuarioService } from '../../services/usuario.service';

@Component({
    selector: 'app-usuarios',
    imports: [RouterLink, TabelaUsuariosComponent],
    standalone: true,
    templateUrl: './usuarios.component.html',
})
export class UsuariosComponent {

    constructor(private usuarioService : UsuarioService) {}

    logout() {
        this.usuarioService.logout();
    }
}
