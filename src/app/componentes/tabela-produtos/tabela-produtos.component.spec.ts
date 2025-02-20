import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaProdutosComponent } from './tabela-produtos.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TabelaProdutosComponent', () => {
    let component: TabelaProdutosComponent;
    let fixture: ComponentFixture<TabelaProdutosComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TabelaProdutosComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(TabelaProdutosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
