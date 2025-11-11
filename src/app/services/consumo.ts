import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lectura } from '../models/consumo.model';

@Injectable({
  providedIn: 'root'
})
export class LecturaService {
  private apiUrl = 'http://127.0.0.1:8000/api/lecturas/';

  constructor(private http: HttpClient) {}

  // Listar lecturas
  getLecturas(): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(this.apiUrl);
  }

  // Crear lectura
  addLectura(lectura: Lectura): Observable<Lectura> {
    return this.http.post<Lectura>(this.apiUrl, lectura);
  }
}
