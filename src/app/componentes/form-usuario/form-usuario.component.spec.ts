import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUsuarioComponent } from './form-usuario.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('FormUsuarioComponent', () => {
    let component: FormUsuarioComponent;
    let fixture: ComponentFixture<FormUsuarioComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormUsuarioComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideRouter([]),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(FormUsuarioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
