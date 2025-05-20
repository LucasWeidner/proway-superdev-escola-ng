import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Aluno } from '../../../models/aluno';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DataHoraCustomizadaPipe } from '../../../pipes/date.pipe';
import { DatePipe } from '@angular/common';
import { FormatarCpfPipe } from "../../../pipes/formatar-cpf.pipe";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AlunoCadastro } from '../../../models/aluno-cadastro';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePicker } from 'primeng/datepicker';
import { AlunoService } from '../../../services/aluno.service';

@Component({
  selector: 'app-alunos-lista',
  imports: [ButtonModule, Dialog, InputTextModule, TableModule, DataHoraCustomizadaPipe, FormatarCpfPipe, ConfirmDialogModule, ToastModule, FormsModule, InputMaskModule, DatePicker,],
  templateUrl: './alunos-lista.component.html',
  styleUrl: './alunos-lista.component.css',
  providers: [DataHoraCustomizadaPipe, DatePipe, FormatarCpfPipe, MessageService, ConfirmationService, AlunoService]
})
export class AlunosListaComponent {
  alunos: Aluno[];
  alunoCadastro: AlunoCadastro;
  dialogVisivelCadastarEditar: boolean = false;
  dialogTituloCadastrarEditar?: string;
  idAlunoEditar?: number;
  carregandoAlunos: boolean = false;
  dataMinima: Date;
  dataMaxima: Date;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private alunoService: AlunoService){
    this.alunos = []

    this.alunoCadastro = new AlunoCadastro();

    let dataHoraAgora = new Date(Date.now());

    this.dataMinima = new Date (1900, 0, 1);
    this.dataMaxima = new Date (dataHoraAgora.getFullYear(), dataHoraAgora.getMonth(), dataHoraAgora.getDay(), 23, 59, 59)
  }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  private carregarAlunos() {
    this.carregandoAlunos = true;
    this.alunoService.obterTodos().subscribe({
      next: alunos => this.alunos = alunos,
      error: erro => console.log("Ocorreu um erro ao carregar a lista de alunos:" + erro),
      complete: () => this.carregandoAlunos = false
    });
  }

  abrirModalCadastrar(){
    this.dialogTituloCadastrarEditar = "Cadastro de Aluno";
    this.alunoCadastro = new Aluno();
    this.idAlunoEditar = undefined;
    this.dialogVisivelCadastarEditar = true;    
  }

  abrirModalEditar(aluno: Aluno){
    this.dialogTituloCadastrarEditar = `Editar Aluno - ${aluno.nome.toString()}`;
    this.alunoCadastro = new AlunoCadastro();
    this.alunoCadastro.nome = aluno.nome;
    this.alunoCadastro.sobrenome = aluno.sobrenome;
    this.alunoCadastro.cpf = aluno.cpf;
    this.alunoCadastro.dataNascimento =  new Date(aluno.dataNascimento!);
    this.idAlunoEditar = aluno.id;

    this.dialogVisivelCadastarEditar = true;
  }

  confirm1(event: Event, alunoId: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Deseja realmente apagar',
        header: 'Cuidado',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Deletar',
            severity: 'danger'
        },
        accept: () => this.apagar(alunoId)
    });
  }

  private apagar(alunoId: number){
    this.alunoService.apagar(alunoId).subscribe({
      next: () => this.apresentarMensagemApagado(),
      error: erro => console.log('Ocorreu um erro ao apagar o aluno: ${ erro}'), 
    })
  }

  private apresentarMensagemApagado(){
    this.messageService.add({ severity: 'sucess', summary: 'Sucesso', detail: 'Aluno removido com sucesso'});
    this.carregarAlunos();
  }


  cadastrar(){
    this.alunoService.cadastrar(this.alunoCadastro).subscribe({
      next: aluno => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao cadastrar o aluno:" + erro),
    })
  }

  apresentarMensagemCadastrado(){
    this.messageService.add({ severity: 'success', summary: 'Successo', detail: 'Aluno cadastrado com sucesso' });
    
    alert('Aluno cadastrado com sucesso')
    this.dialogVisivelCadastarEditar = false
    this.alunoCadastro = new AlunoCadastro();
    this.carregarAlunos();
  }

  salvar(){
    if(this.idAlunoEditar === undefined)
      this.cadastrar();
    else 
    this.editar();
  }
  
    private editar(){
      this.alunoService.alterar(this.idAlunoEditar!, this.alunoCadastro).subscribe({
        next: aluno => this.apresentarMensagemEditado(),
        error: erro => console.log('Ocorreu um erro ao editar o aluno' + erro),
      })
    }

    private apresentarMensagemEditado(){
      this.messageService.add({ severity: 'sucess', summary: 'sucesso', detail: 'Aluno alterado com sucesso'});
      this.dialogVisivelCadastarEditar = false
      this.idAlunoEditar = undefined;
      this.alunoCadastro = new AlunoCadastro();
      this.carregarAlunos();
    }
}