import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './componentes/container/container.component';

@Component({
    selector: 'app-root',
    imports: [
    ContainerComponent,
    RouterOutlet
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
