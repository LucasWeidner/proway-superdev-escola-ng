import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Formacao } from '../../../models/formacao';
import { FormacaoService } from '../../../services/formacao.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-formacao-lista',
  imports: [TableModule, CommonModule, ButtonModule,ToastModule, ConfirmDialogModule],
  templateUrl: './formacao-lista.component.html',
  styleUrl: './formacao-lista.component.css',
  providers: [ConfirmationService, MessageService]
})
export class FormacaoListaComponent implements OnInit{
  formacoes: Array<Formacao>;
  carregandoFormacoes?: Boolean;

  ngOnInit(): void {
    this.carregarFormacoes();
  }

  constructor(
    private router: Router, 
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private formacaoService: FormacaoService,
  ){
    this.formacoes = []
  }

  private carregarFormacoes() {
    this.carregandoFormacoes = true;
    this.formacaoService.obterTodos().subscribe({
      next: formacoes => this.formacoes = formacoes,
      error: erro => console.log("Ocorreu um erro ao carregar a lista de cursos: " + erro),
      complete: () => this.carregandoFormacoes = false
    });
  }


  redirecionarPaginaFormacao(){
    this.router.navigate(["formacao/cadastro"])
  }

  redirecionarEditar(idFormacao: number) {
    this.router.navigate(["/formacoes/editar/" + idFormacao])
  }


  confirmarParaApagar(event: Event, id: number){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Deseja realmente apagar",
      header: "Cuidado",
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Apagar',
        severity: 'danger',
      },
      accept: () => this.apagar(id)
    });
  }

  private apagar(id: number){
    this.formacaoService.apagar(id).subscribe({
      next: () => this.apresentarMensagemApagado(),
      error: erro => console.log(`Ocorreu um erro ao tentar apagar: ${erro}`),
    })

  }

  private apresentarMensagemApagado(){
    this.messageService.add({
      severity: 'sucess',
      summary: 'Sucesso',
      detail: 'Curso apagado com sucesso'
    });
    this.carregarFormacoes();
  }

}

