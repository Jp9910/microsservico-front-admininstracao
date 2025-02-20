import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
    title = 'Loja - Administração';
    
    // TODO: Adicionar biblioteca para end2end testing (ng e2e) e para deploy (ng deploy)

    // Da pra usar essa função sem implementar a interface OnInit, mas é uma boa prática implementar
    ngOnInit(): void {
        console.log("`ngOnInit()` é executada assim que o componente for carregado")
    }
}
