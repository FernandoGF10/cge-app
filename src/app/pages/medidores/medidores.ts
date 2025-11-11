import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedidorService } from '../../services/medidores';
import { Medidor } from '../../models/medidor.model';

@Component({
  selector: 'app-medidores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medidores.html'
})
export class MedidoresComponent implements OnInit {
  medidores: Medidor[] = [];
  nuevoMedidor: Medidor = {
    codigo_medidor: '',
    id_cliente: 0,
    direccion_suministro: '',
    estado: true
  };

  constructor(private medidorService: MedidorService) {}

  ngOnInit(): void {
    this.cargarMedidores();
  }

  // 🔹 Cargar lista de medidores
  cargarMedidores() {
    this.medidorService.getMedidores().subscribe({
      next: (data) => {
        this.medidores = data;
      },
      error: (err) => {
        console.error('Error al obtener medidores:', err);
      }
    });
  }

  // 🔹 Crear medidor nuevo
  agregarMedidor() {
    this.medidorService.addMedidor(this.nuevoMedidor).subscribe({
      next: () => {
        this.cargarMedidores();
        this.nuevoMedidor = {
          codigo_medidor: '',
          id_cliente: 0,
          direccion_suministro: '',
          estado: true
        };
      },
      error: (err) => console.error('Error al agregar medidor:', err)
    });
  }

  // 🔹 Eliminar medidor
  eliminarMedidor(id: number) {
    if (confirm('¿Seguro que deseas eliminar este medidor?')) {
      this.medidorService.deleteMedidor(id).subscribe({
        next: () => this.cargarMedidores(),
        error: (err) => console.error('Error al eliminar medidor:', err)
      });
    }
  }

  // 🔹 Cambiar estado (activo/inactivo)
  cambiarEstado(id: number) {
    this.medidorService.cambiarEstado(id).subscribe({
      next: () => this.cargarMedidores(),
      error: (err) => console.error('Error al cambiar estado:', err)
    });
  }
}
