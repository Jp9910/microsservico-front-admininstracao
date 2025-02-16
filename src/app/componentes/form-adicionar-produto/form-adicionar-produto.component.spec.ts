import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdicionarProdutoComponent } from './form-adicionar-produto.component';

describe('FormAdicionarProdutoComponent', () => {
  let component: FormAdicionarProdutoComponent;
  let fixture: ComponentFixture<FormAdicionarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAdicionarProdutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAdicionarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
