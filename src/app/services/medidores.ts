import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medidor } from '../models/medidor.model';

@Injectable({
  providedIn: 'root'
})
export class MedidorService {
  private apiUrl = 'http://127.0.0.1:8000/api/medidores/';

  constructor(private http: HttpClient) {}

  // Listar medidores
  getMedidores(): Observable<Medidor[]> {
    return this.http.get<Medidor[]>(this.apiUrl);
  }

  // Obtener un medidor específico
  getMedidor(id: number): Observable<Medidor> {
    return this.http.get<Medidor>(`${this.apiUrl}${id}`);
  }

  // Crear medidor
  addMedidor(medidor: Medidor): Observable<Medidor> {
    return this.http.post<Medidor>(this.apiUrl, medidor);
  }

  // Actualizar medidor
  updateMedidor(id: number, medidor: Medidor): Observable<Medidor> {
    return this.http.put<Medidor>(`${this.apiUrl}${id}`, medidor);
  }

  // Cambiar estado del medidor
  cambiarEstado(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/estado`, {});
  }

  // Eliminar medidor
  deleteMedidor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}
