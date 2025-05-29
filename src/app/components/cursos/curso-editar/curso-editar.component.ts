import { Component } from '@angular/core';
import { CursoEditar } from '../../../models/curso-editar';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CursoService } from '../../../services/curso.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Curso } from '../../../models/curso';

@Component({
  selector: 'app-curso-editar',
  imports: [ 
    FormsModule, 
    InputTextModule, 
    FloatLabelModule, 
    InputMaskModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './curso-editar.component.html',
  styleUrl: './curso-editar.component.css'
})
export class CursoEditarComponent {
  curso: CursoEditar;
  idEditar: number;
  
  constructor(
    private router: Router,
    private CusroService: CursoService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ){
    this.curso = new CursoEditar();
    this.idEditar = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!.toString());
  }

  ngOnInit() {
    this.CusroService.obterPorId(this.idEditar).subscribe({
      next: curso => this.apresentarMensagemEditar(curso),
      error: erro => console.log("Ocorreu um erro ao editar o aluno: " + erro),
    })
  }

  private apresentarMensagemEditar(curso: Curso){
    this.curso.nome = curso.nome;
    this.curso.sigla = curso.sigla;
  }

  editar() {
    this.CusroService.editar(this.idEditar, this.curso).subscribe({
      next: curso => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao editar o curso:" + erro),
    })
  }

  private apresentarMensagemCadastrado() {
    this.messageService.add({ severity: 'sucess', summary: 'Sucesso', detail: 'Curso alterado com sucesso'});
    this.router.navigate(["/cursos"]);
  }
}
