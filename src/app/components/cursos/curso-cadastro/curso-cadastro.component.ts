import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CursoCadastro } from '../../../models/curso-cadastro';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';


@Component({
  selector: 'app-curso-cadastro',
  imports: [FormsModule, InputTextModule, FloatLabelModule, InputMaskModule,
  ButtonModule],
  templateUrl: './curso-cadastro.component.html',
  styleUrl: './curso-cadastro.component.css'
})
export class CursoCadastroComponent {
  curso: CursoCadastro;
  constructor(){
    this.curso = new CursoCadastro();
  }
}
