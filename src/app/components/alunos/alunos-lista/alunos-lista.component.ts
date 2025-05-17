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

@Component({
  selector: 'app-alunos-lista',
  imports: [ButtonModule, Dialog, InputTextModule, TableModule, DataHoraCustomizadaPipe, FormatarCpfPipe, ConfirmDialogModule, ToastModule, FormsModule, InputMaskModule, DatePicker,],
  templateUrl: './alunos-lista.component.html',
  styleUrl: './alunos-lista.component.css',
  providers: [DataHoraCustomizadaPipe, DatePipe, FormatarCpfPipe, MessageService, ConfirmationService,]
})
export class AlunosListaComponent {
  alunos: Aluno[];
  alunoCadastro: AlunoCadastro;
  visible: boolean = false;
  dataMinima: Date;
  dataMaxima: Date;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService){
    this.alunos = [
      new Aluno("Matheus", "Da Silva", new Date(2000, 4, 5), 1, "123.456.789-10"),
      new Aluno("Maria", "Da silva", new Date(2000, 4, 5), 11, "921.345.678-99")
    ]

    this.alunoCadastro = new AlunoCadastro();

    let dataHoraAgora = new Date(Date.now());

    this.dataMinima = new Date (1900, 0, 1);
    this.dataMaxima = new Date (dataHoraAgora.getFullYear(), dataHoraAgora.getMonth(), dataHoraAgora.getDay())
  }

  abrirModalCadastrar(){
    this.visible = true;    
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Deseja realmente apagar',
        header: 'Cudiado',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Save',
        },
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        },
        reject: () => {
            this.messageService.add({
                severity: 'error',
                summary: 'Rejected',
                detail: 'You have rejected',
                life: 3000,
            });
        },
    });
}

}