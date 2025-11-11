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
  id_medidor: number | null = null;
  filtroMes: number | null = null;
  filtroAnio: number | null = null;
  mensaje: string = '';

  nuevaLectura: Lectura = {
    id_medidor: 0,
    anio: new Date().getFullYear(),
    mes: new Date().getMonth() + 1,
    lectura_kwh: 0,
    observacion: ''
  };

  constructor(private lecturaService: LecturaService) {}

  ngOnInit(): void {}

  // ✅ Cargar lecturas por medidor + filtros
  cargarLecturas() {
    if (!this.id_medidor) {
      this.mensaje = 'Debes ingresar un ID de medidor para ver las lecturas.';
      return;
    }

    this.lecturaService.getLecturas(this.id_medidor, this.filtroMes ?? undefined, this.filtroAnio ?? undefined).subscribe({
      next: (data) => {
        this.lecturas = data;
        this.mensaje = data.length ? '' : 'No se encontraron lecturas.';
      },
      error: (err) => {
        console.error('Error al obtener lecturas:', err);
        this.mensaje = 'Error al cargar lecturas.';
      }
    });
  }

  aplicarFiltros() {
    this.cargarLecturas();
  }

  limpiarFiltros() {
    this.filtroMes = null;
    this.filtroAnio = null;
    this.cargarLecturas();
  }

  // ✅ Crear lectura
  agregarLectura() {
    if (!this.nuevaLectura.id_medidor || !this.nuevaLectura.mes || !this.nuevaLectura.anio || this.nuevaLectura.lectura_kwh <= 0) {
      this.mensaje = 'Completa todos los campos correctamente.';
      return;
    }

    this.lecturaService.addLectura(this.nuevaLectura).subscribe({
      next: () => {
        this.mensaje = 'Lectura agregada correctamente.';
        this.cargarLecturas();
        this.nuevaLectura = {
          id_medidor: this.nuevaLectura.id_medidor,
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
