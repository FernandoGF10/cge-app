export interface Lectura {
  id_lectura?: number;
  id_medidor: number;
  anio: number;
  mes: number;
  lectura_kwh: number;
  observacion?: string;
  created_at?: string;
}
