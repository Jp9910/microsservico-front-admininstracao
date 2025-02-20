import { TestBed } from '@angular/core/testing';
import { ChamadaAPIService } from './chamada-api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ChamadaAPIService', () => {
  let service: ChamadaAPIService;

  // Ler mais sobre testes de serviços HTTP: https://angular.dev/guide/http/testing

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ChamadaAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
