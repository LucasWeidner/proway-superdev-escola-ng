import { Injectable } from '@angular/core';
import { AlunoCadastro } from '../models/aluno-cadastro';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Aluno } from '../models/aluno';

@Injectable({
  providedIn: 'root'
})

export class AlunoService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = "http://localhost:8000/api/alunos";
  }

  cadastrar(alunoCadastro: AlunoCadastro): Observable<any>{
    return this.http.post<any>(this.urlApi, alunoCadastro);
  }

  obterTodos(): Observable<Array<Aluno>>{
    return this.http.get<Array<Aluno>>(this.urlApi);
  }

  apagar(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/${id}`);
  }

  alterar(id: number, aluno: AlunoCadastro): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/${id}`, aluno);
  }
}