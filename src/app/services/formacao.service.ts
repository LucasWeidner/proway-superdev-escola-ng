import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formacao } from '../models/formacao';
import { FormacaoCadastro } from '../models/formacao-cadastro';

@Injectable({
  providedIn: 'root'
})
export class FormacaoService {
  private urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi="http://localhost:8000/api/formacoes"
   }

   cadastrar(FormacaoCadastro : FormacaoCadastro): Observable<Formacao>{
    return this.http.post<Formacao>(this.urlApi, FormacaoCadastro);
   }


   obterTodos(): Observable<Formacao[]>{
    return this.http.get<Formacao[]>(this.urlApi);

   }


}
