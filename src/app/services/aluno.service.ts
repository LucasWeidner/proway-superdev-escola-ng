import { Injectable } from '@angular/core';
import { AlunoCadastro } from '../models/aluno-cadastro';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private urlApi: string;

  constructor(private http: HttpClient) { 
    this.urlApi = "https://public.franciscosensaulas.com/alunos"
  }

  cadastrar(alunoCadastro: AlunoCadastro): Observable<any>{
    return this.http.post<any>(this.urlApi, alunoCadastro);
  }

  obterTodos(): Observable<Array<Aluno>>{
    return this.http.get<Array<Aluno>>(this.urlApi);
  }
}
