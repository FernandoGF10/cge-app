import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://127.0.0.1:8000/api/clientes/';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.clientes)
    );
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}`;
    console.log('Eliminando cliente desde:', url);  // 👀 para debug
    return this.http.delete(url);
  }
}
