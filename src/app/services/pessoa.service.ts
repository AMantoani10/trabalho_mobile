import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pessoa {
  id?: string;
  nome: string;
  sobrenome: string;
  idade: number;
  telefone: string;
  email: string;
  cidade: string;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private baseUrl = "http://localhost:8000";

  constructor(private http: HttpClient) {}

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.baseUrl}/pessoas`);
  }

  getPessoa(id: string): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.baseUrl}/pessoas/${id}`);
  }

  addPessoa(data: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${this.baseUrl}/pessoas`, data);
  }

  updatePessoa(id: string, data: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.baseUrl}/pessoas/${id}`, data);
  }

  deletePessoa(id: string) {
    return this.http.delete(`${this.baseUrl}/pessoas/${id}`);
  }
}
