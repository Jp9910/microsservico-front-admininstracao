import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { TabelaUsuariosComponent } from './tabela-usuarios.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TabelaUsuariosComponent', () => {
    let component: TabelaUsuariosComponent;
    let fixture: ComponentFixture<TabelaUsuariosComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TabelaUsuariosComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(TabelaUsuariosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
