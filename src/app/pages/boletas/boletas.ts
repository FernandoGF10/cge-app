import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoletaService } from '../../services/boleta';
import { Boleta } from '../../models/boleta.model';

@Component({
  selector: 'app-boletas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boletas.html',
  styleUrls: ['./boletas.css']
})
export class BoletasComponent implements OnInit {
  boletas: Boleta[] = [];
  idCliente: number | null = null;
  mensaje: string = '';

  constructor(private boletaService: BoletaService) {}

  ngOnInit(): void {
    this.cargarBoletas();
  }

  cargarBoletas() {
    this.boletaService.getBoletas().subscribe({
      next: (data) => (this.boletas = data),
      error: (err) => console.error('Error al listar boletas:', err)
    });
  }

  generarBoleta() {
    if (!this.idCliente) return;

    this.boletaService.generarBoleta(this.idCliente).subscribe({
      next: (boleta) => {
        this.mensaje = `Boleta generada correctamente para el cliente ${this.idCliente}`;
        this.cargarBoletas();
      },
      error: (err) => {
        console.error('Error al generar boleta:', err);
        this.mensaje = 'Error al generar la boleta.';
      }
    });
  }

  descargarPDF(id_boleta: number) {
    this.boletaService.descargarPdf(id_boleta).subscribe((pdfBlob) => {
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `boleta_${id_boleta}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
