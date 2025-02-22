import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './componentes/container/container.component';
import { TestConnectivityService } from './services/test-connectivity.service';

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

    constructor(private testConnectivityService: TestConnectivityService) { }
    
    // TODO: Adicionar biblioteca para end2end testing (ng e2e) e para deploy (ng deploy)

    // Da pra usar essa função sem implementar a interface OnInit, mas é uma boa prática implementar
    ngOnInit(): void {
        console.log("`ngOnInit()` é executada assim que o componente for carregado")

        this.testConnectivityService.testApiLoja().subscribe({
            next: response => console.log('API Loja is reachable', response),
            error: error => console.error('API Loja is not reachable', error)
        });

        this.testConnectivityService.testApiUsuarios().subscribe({
            next: response => console.log('API Usuarios is reachable', response),
            error: error => console.error('API Usuarios is not reachable', error)
        });
    }
}
