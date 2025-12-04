import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // URL base da sua API Python
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  listar(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pessoas/`);
  }

  criar(dados: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pessoas/`, dados);
  }

  buscarPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pessoas/${id}`);
  }
  atualizar(id: string, dados: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/pessoas/${id}`, dados);
  }
  excluir(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/pessoas/${id}`);
  }

}
