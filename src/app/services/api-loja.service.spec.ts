import { TestBed } from '@angular/core/testing';

import { ApiLojaService } from './api-loja.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ApiLojaService', () => {
    let service: ApiLojaService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ],
        });
        service = TestBed.inject(ApiLojaService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
