export interface Medidor {
  id_medidor?: number;
  codigo_medidor: string;
  id_cliente: number;
  direccion_suministro: string;
  estado: boolean;
  created_at?: string;
}
