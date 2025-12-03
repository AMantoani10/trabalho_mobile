import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  private API_URL = 'http://localhost:8000/pessoas';

  constructor(private http: HttpClient) { }
  cadastrarPessoa(dados: any): Observable<any> {
    return this.http.post(`${this.API_URL}`, dados);
  }

  // Listar
  listarPessoas(): Observable<any> {
    return this.http.get(`${this.API_URL}`);
  }

  // Buscar 1
  buscarPessoa(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  // Atualizar
  atualizarPessoa(id: string, dados: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, dados);
  }

  // Deletar
  excluirPessoa(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

}
