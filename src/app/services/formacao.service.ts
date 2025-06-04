import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formacao } from '../models/formacao';
import { FormacaoCadastro } from '../models/formacao-cadastro';
import { FormacaoEditar } from './formacao-editar';

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


   obterPorId(id: number): Observable<Formacao>{
    return this.http.get<Formacao>(`${this.urlApi}/${id}`);
  }

   editar(id: number, formacaoEditar: FormacaoEditar): Observable<Formacao> {
    return this.http.put<Formacao>(`${this.urlApi}/${id}`, formacaoEditar);
  }


   apagar(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/${id}`);
   }

}
