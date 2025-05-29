import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CursoCadastro } from '../../../models/curso-cadastro';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CursoService } from '../../../services/curso.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-curso-cadastro',
  imports: [
    FormsModule, 
    InputTextModule, 
    FloatLabelModule, 
    InputMaskModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './curso-cadastro.component.html',
  styleUrl: './curso-cadastro.component.css'
})
export class CursoCadastroComponent {
  curso: CursoCadastro;
  
  constructor(
    private router: Router,
    private CusroService: CursoService,
    private messageService: MessageService,
  ){
    this.curso = new CursoCadastro();
  }

  cadastrar() {
    this.CusroService.cadastrar(this.curso).subscribe({
      next: aluno => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao cadastar o aluno: " + erro),
    })
  }

  private apresentarMensagemCadastrado(){
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Curso cadastrado com sucesso'});
    this.router.navigate(["/cursos"]);
  }
}
