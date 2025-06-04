import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CursoService } from '../../../services/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormacaoEditar } from '../../../services/formacao-editar';
import { FormacaoService } from '../../../services/formacao.service';
import { Formacao } from '../../../models/formacao';

@Component({
  selector: 'app-formacao-editar',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './formacao-editar.component.html',
  styleUrl: './formacao-editar.component.css'
})
export class FormacaoEditarComponent {
  formacao: FormacaoEditar;
  idEditar: number;

  constructor(
    private formacaoService: FormacaoService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){
    this.formacao = new FormacaoEditar();
    this.idEditar = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!.toString());
  }


  ngOnInit(){
    this.formacaoService.obterPorId(this.idEditar).subscribe({
      next: formacao => this.preencherCamposParaEditar(formacao),
      error: erro => console.log("Ocorreu ao carregar os dados do curso:" + erro),
    })
  }

  private preencherCamposParaEditar(formacao: Formacao){
    this.formacao.descricao = formacao.descricao;
  }

  editar() {
    this.formacaoService.editar(this.idEditar, this.formacao).subscribe({
      next: formacao => this.apresentarMensagemEditado(),
      error: erro => console.log("Ocorreu um erro ao tentar editar a Formação:" + erro),
    })
  }

  apresentarMensagemEditado(){
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Formação alterada com sucesso' });
    this.router.navigate(["/Formacoes"]);
  }

}
