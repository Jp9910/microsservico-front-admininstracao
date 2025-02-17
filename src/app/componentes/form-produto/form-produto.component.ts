import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValueChangeEvent } from '@angular/forms';
import { ChamadaAPIService } from '../../services/chamada-api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'app-form-adicionar-produto',
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    standalone: true,
    templateUrl: './form-produto.component.html',
})
export class FormProdutoComponent implements OnInit {
    formAdicionarProduto!: FormGroup; // gerencia o valor e a validação dos dados e estados de um formulário reativo\
    arquivoImagem: File | null = null;
    formEnviado: boolean = false;
    @Input() tituloFormulario?: string = "";

    // injetar a dependencia do service no componente pelo construtor
    constructor (private servicoAPI: ChamadaAPIService, private activatedRoute: ActivatedRoute) { }

    // ngOnInit() é executado quando o componente é criado
    ngOnInit(): void {
        console.log(this.activatedRoute.snapshot.data['titulo']) // Vem do app.routes.ts
        this.tituloFormulario = this.activatedRoute.snapshot.title // Vem do app.routes.ts
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

    editarProduto(id: number): void {
        console.log("Editando produto...")
        this.servicoAPI.atualizarProduto(id, produto)
            .pipe(catchError(this.handleErroRequisicao))
            .subscribe((resposta) => {console.log(resposta)});
    }

    adicionarOuEditarProduto() {
        if (this.tituloFormulario === "Editar produto") {this.editarProduto()} 
        if (this.tituloFormulario === "Adicionar produto") {this.adicionarProduto()}
    }

    limparFormulario() {
        this.formEnviado = false;
        this.formAdicionarProduto.reset();
    }
}
