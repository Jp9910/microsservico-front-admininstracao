import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValueChangeEvent } from '@angular/forms';
import { ChamadaAPIService } from '../../services/chamada-api.service';

@Component({
    selector: 'app-form-adicionar-produto',
    imports: [ReactiveFormsModule, CommonModule],
    standalone: true,
    templateUrl: './form-adicionar-produto.component.html',
})
export class FormAdicionarProdutoComponent implements OnInit {
    formAdicionarProduto!: FormGroup; // gerencia o valor e a validação dos dados e estados de um formulário reativo\
    arquivoImagem: File | null = null;
    formEnviado: boolean = false;

    // injetar a dependencia do service no componente pelo construtor
    constructor (private servicoAPI: ChamadaAPIService) { }

    // ngOnInit() é executado quando o componente é criado
    ngOnInit(): void {
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
        console.log(this.arquivoImagem)
        if (this.formAdicionarProduto.valid) {
            this.servicoAPI.salvarNovoProduto(this.formAdicionarProduto.value, this.arquivoImagem).subscribe(() => {
                alert("Produto salvo!")
                this.formAdicionarProduto.reset();
            });
        }
        if (this.formAdicionarProduto.invalid) {
            console.log("Form INVÁLIDO!")
            alert("Pedido não registrado. Alguns dados no formulários estão inválidos.")
        }
    }

    limparFormulario() {
        this.formEnviado = false;
        this.formAdicionarProduto.reset();
    }
}
