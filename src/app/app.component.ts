import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'escola-ng';

  constructor(private router: Router) { }

  redirecionarCursos(){

    this.router.navigate(["/cursos"])
  }

  redirecionarHome(){

    this.router.navigate(["/"])
  }


}
