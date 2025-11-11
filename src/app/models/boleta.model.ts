export interface Boleta {
  id_boleta?: number;
  id_cliente: number;
  anio: number;
  mes: number;
  kwh_total: number;
  tarifa_base: number;
  cargos: number;
  iva: number;
  total_pagar: number;
  estado: string;
  created_at?: string;
}
