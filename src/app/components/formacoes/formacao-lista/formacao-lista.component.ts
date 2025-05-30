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



}

