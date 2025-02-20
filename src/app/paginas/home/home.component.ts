import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from "../../componentes/container/container.component";

@Component({
    selector: 'app-home',
    imports: [RouterLink, ContainerComponent],
    standalone: true,
    templateUrl: './home.component.html',
})
export class HomeComponent {
    usuario = "";
    
}
