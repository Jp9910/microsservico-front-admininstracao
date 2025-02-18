import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValueChangeEvent } from '@angular/forms';
import { ChamadaAPIService } from '../../services/chamada-api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-form-adicionar-produto',
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    standalone: true,
    templateUrl: './form-produto.component.html',
})
export class FormProdutoComponent implements OnInit {
    formularioProduto!: FormGroup; // gerencia o valor e a validação dos dados e estados de um formulário reativo\
    arquivoImagem: File | null = null;
    formEnviado: boolean = false;
    idProduto: string|null = null;
    @Input() tituloFormulario?: string = "";


    // injetar a dependencia do service no componente pelo construtor
    constructor (private servicoAPI: ChamadaAPIService, private activatedRoute: ActivatedRoute) { }

    // ngOnInit() é executado quando o componente é criado
    ngOnInit(): void {
        console.log(this.activatedRoute.snapshot.data['titulo']) // Vem do app.routes.ts
        this.tituloFormulario = this.activatedRoute.snapshot.title // Vem do app.routes.ts
        this.idProduto = this.activatedRoute.snapshot.paramMap.get('id'); // só vai existir se for na url de edição de produto
        console.log("Id produto: "+this.idProduto);
        this.formularioProduto = new FormGroup({
            nome: new FormControl('', Validators.required),
            preco: new FormControl(0, [Validators.required, Validators.min(0.1)]),
            estoque: new FormControl('', [Validators.required, Validators.min(1)]),
            descricao: new FormControl(''),
            imagem: new FormControl('')
        });
        if (this.idProduto) {this.getProduto();} // popular informações do formulário de edição
    }

    arquivoSelecionado(event: any) {
        this.arquivoImagem = event.target.files[0] ?? null;
        if (this.arquivoImagem) {
            // Ler arquivo
            const reader = new FileReader();
            reader.onload = () => {
                console.log(reader.result)
                if(reader.result) {
                    this.formularioProduto.get('imagem')?.setValue(reader.result)
                }
            }
            reader.readAsDataURL(this.arquivoImagem) // transformar a em string BASE64
        }
    }

    adicionarProduto() {
        console.log("Adicionando produto...")
        this.servicoAPI.salvarNovoProduto(this.formularioProduto.value, this.arquivoImagem).subscribe(() => {
            alert("Produto salvo!")
            this.limparFormulario();
        });
    }

    editarProduto(): void {
        console.log("Editando produto...")
        this.servicoAPI.atualizarProduto(parseInt(this.idProduto!), this.formularioProduto.value, this.arquivoImagem)
            .pipe(catchError(this.handleErroRequisicao))
            .subscribe((resposta) => {
                console.log(resposta)
                alert("Produto atualizado!")
            });
    }

    adicionarOuEditarProduto(): void {
        this.formEnviado = true;
        if (this.idProduto && this.formularioProduto.valid) {
            return this.editarProduto()
        }
        if (!this.idProduto && this.formularioProduto.valid) {
            return this.adicionarProduto()
        }
        if (this.formularioProduto.invalid) {
            alert("Não foi possível salvar o produto. Alguns dados no formulários estão inválidos.")
        }
    }

    limparFormulario() {
        this.formEnviado = false;
        this.formularioProduto.reset();
    }

    getProduto() {
        if (this.idProduto) {
            this.servicoAPI.getProdutoPorId(parseInt(this.idProduto))
                .subscribe((produto) => {
                    console.log(produto.body)
                    if(produto.body) {this.formularioProduto.patchValue(produto.body);}
                });
        }
    }

    handleErroRequisicao(erro: HttpErrorResponse) {
        // alert("Erro ao processar requisição :(");
        console.error(erro)
        return []
    }
}
