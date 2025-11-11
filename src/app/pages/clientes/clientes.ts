import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes.html',
})
export class ClientesComponent implements OnInit {
  formCliente!: FormGroup;
  clientes: Cliente[] = [];
  cargando = false;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.formCliente = this.fb.group({
      rut: ['', [Validators.required, this.validarRut]],
      nombre_razon: ['', [Validators.required, Validators.minLength(3)]],
      email_contacto: ['', [Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      direccion_facturacion: ['', Validators.required],
    });

    this.cargarClientes();
  }

  // Validación RUT chileno básica
  validarRut(control: any) {
    const rutRegex = /^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/;
    return rutRegex.test(control.value) ? null : { rutInvalido: true };
  }

  hasError(field: string, error: string) {
    const control = this.formCliente.get(field);
    return control?.hasError(error) && control.touched;
  }

  onSubmit() {
    if (this.formCliente.invalid) {
      this.formCliente.markAllAsTouched();
      return;
    }

    this.cargando = true;
    const nuevoCliente = this.formCliente.value;

    this.clienteService.addCliente(nuevoCliente).subscribe({
      next: (data) => {
        this.formCliente.reset();
        this.cargarClientes();
        this.cargando = false;
        alert('Cliente creado correctamente');
      },
      error: (err) => {
        console.error('Error al crear cliente:', err);
        this.cargando = false;
        alert('Error al crear cliente');
      },
    });
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data) => (this.clientes = data),
      error: (err) => console.error('Error al obtener clientes:', err),
    });
  }

  eliminarCliente(id: number | undefined) {
    if (!id) {
      console.error('ID de cliente no definido');
      return;
    }

    if (confirm('¿Seguro que quieres eliminar este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => {
          console.log('Cliente eliminado correctamente');
          this.clientes = this.clientes.filter(c => c.id_cliente !== id);
        },
        error: (err) => {
          console.error('Error al eliminar cliente:', err);
        }
      });
    }
  }

}
