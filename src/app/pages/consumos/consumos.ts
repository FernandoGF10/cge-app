import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LecturaService } from '../../services/consumo';
import { Lectura } from '../../models/consumo.model';

@Component({
  selector: 'app-lecturas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consumos.html',
  styleUrls: ['./consumos.css']
})
export class LecturasComponent implements OnInit {
  lecturas: Lectura[] = [];
  nuevaLectura: Lectura = {
    id_medidor: 0,
    anio: new Date().getFullYear(),
    mes: new Date().getMonth() + 1,
    lectura_kwh: 0,
    observacion: ''
  };
  mensaje: string = '';

  constructor(private lecturaService: LecturaService) {}

  ngOnInit(): void {
    this.cargarLecturas();
  }

  cargarLecturas() {
    this.lecturaService.getLecturas().subscribe({
      next: (data) => (this.lecturas = data),
      error: (err) => console.error('Error al obtener lecturas:', err)
    });
  }

  agregarLectura() {
    if (!this.nuevaLectura.id_medidor || !this.nuevaLectura.anio || !this.nuevaLectura.mes || this.nuevaLectura.lectura_kwh <= 0) {
      this.mensaje = 'Completa todos los campos correctamente.';
      return;
    }

    this.lecturaService.addLectura(this.nuevaLectura).subscribe({
      next: () => {
        this.mensaje = 'Lectura agregada correctamente.';
        this.cargarLecturas();
        this.nuevaLectura = {
          id_medidor: 0,
          anio: new Date().getFullYear(),
          mes: new Date().getMonth() + 1,
          lectura_kwh: 0,
          observacion: ''
        };
      },
      error: (err) => {
        console.error('Error al agregar lectura:', err);
        this.mensaje = 'Error al agregar lectura.';
      }
    });
  }
}
