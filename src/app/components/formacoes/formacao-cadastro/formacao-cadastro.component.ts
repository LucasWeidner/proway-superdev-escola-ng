import { Component } from '@angular/core';
import { FormacaoCadastro } from '../../../models/formacao-cadastro';
import { FormacaoService } from '../../../services/formacao.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-formacao-cadastro',
  imports: [FormsModule, 
    InputTextModule, 
    FloatLabelModule, 
    InputMaskModule,
    ButtonModule,
    ToastModule,
    DatePicker,
  ],
  providers: [MessageService],
  templateUrl: './formacao-cadastro.component.html',
  styleUrl: './formacao-cadastro.component.css'
})
export class FormacaoCadastroComponent {
  formacao: FormacaoCadastro;
  
  constructor(
    private router: Router,
    private FormacaoService: FormacaoService,
    private messageService: MessageService,
  ){
    this.formacao = new FormacaoCadastro();
  }

  cadastrar(){
    this.FormacaoService.cadastrar(this.formacao).subscribe({
      next: formacao => this.apresentarMensagemCadastro(),
      error: erro => console.log("Ocorreu um erro ao cadastrar a formação: " + erro),
    })
  }

  apresentarMensagemCadastro(){
    this.messageService.add({severity: 'sucess', summary: 'Sucesso', detail: 'Formação cadastrado com sucesso'})
    this.router.navigate(["/formacoes"]);
  }




}
