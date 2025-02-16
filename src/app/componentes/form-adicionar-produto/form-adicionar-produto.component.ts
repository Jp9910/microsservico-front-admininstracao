import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValueChangeEvent } from '@angular/forms';

@Component({
    selector: 'app-form-adicionar-produto',
    imports: [ReactiveFormsModule, CommonModule],
    standalone: true,
    templateUrl: './form-adicionar-produto.component.html',
    styleUrl: './form-adicionar-produto.component.css'
})
export class FormAdicionarProdutoComponent {
    formAdicionarProduto!: FormGroup; // gerencia o valor e a validação dos dados e estados de um formulário reativo\
    arquivoImagem: File | null = null;
    formEnviado: boolean = false;
    
    constructor() {
        this.formAdicionarProduto = new FormGroup({
            nome: new FormControl('', Validators.required),
            preco: new FormControl(0, [Validators.required, Validators.min(0.1)]),
            estoque: new FormControl('', [Validators.required, Validators.min(1)]),
            descricao: new FormControl(''),
        });
    }

    arquivoSelecionado(event: any) {
        this.arquivoImagem = event.target.files[0] ?? null;
    }

    adicionarProduto() {
        this.formEnviado = true;
        console.log(this.formAdicionarProduto.value)
        console.log(this.arquivoImagem)
        if (this.formAdicionarProduto.valid) {
            console.log("Form válido!")
        } else {
            console.log("Form INVÁLIDO!")
            console.log(this.formAdicionarProduto)
        }
    }

    limparFormulario() {
        this.formEnviado = false;
        console.log("limpar form")
    }
}
