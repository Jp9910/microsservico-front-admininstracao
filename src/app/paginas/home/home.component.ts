import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [RouterLink],
    standalone: true,
    templateUrl: './home.component.html',
})
export class HomeComponent {
    usuario = "";
    
}
