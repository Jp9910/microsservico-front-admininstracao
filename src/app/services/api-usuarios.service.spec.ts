import { TestBed } from '@angular/core/testing';

import { ApiUsuariosService } from './api-usuarios.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ApiUsuariosService', () => {
    let service: ApiUsuariosService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ],
        });
        service = TestBed.inject(ApiUsuariosService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
