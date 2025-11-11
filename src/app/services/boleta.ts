import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Boleta } from '../models/boleta.model';

@Injectable({
  providedIn: 'root'
})
export class BoletaService {
  private apiUrl = 'http://127.0.0.1:8000/api/boletas/';

  constructor(private http: HttpClient) {}

  // Listar todas las boletas
  getBoletas(): Observable<Boleta[]> {
    return this.http.get<Boleta[]>(this.apiUrl);
  }

  // Generar boleta para un cliente específico
  generarBoleta(id_cliente: number): Observable<Boleta> {
    return this.http.post<Boleta>(`${this.apiUrl}generar?id_cliente=${id_cliente}`, {});
  }

  // Descargar PDF de una boleta
  descargarPdf(id_boleta: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}${id_boleta}/pdf`, { responseType: 'blob' });
  }
}
