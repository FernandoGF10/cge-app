import { Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
];
