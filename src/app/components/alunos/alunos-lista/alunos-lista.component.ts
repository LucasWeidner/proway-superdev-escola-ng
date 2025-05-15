import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Aluno } from '../../../models/aluno';

@Component({
  selector: 'app-alunos-lista',
  imports: [ButtonModule],
  templateUrl: './alunos-lista.component.html',
  styleUrl: './alunos-lista.component.css'
})
export class AlunosListaComponent {
  alunos: Aluno[] = [];

  abrirModalCadastrar(){
    
  }
}