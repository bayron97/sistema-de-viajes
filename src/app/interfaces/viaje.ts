export interface DetalleViaje {
    detalleViajeId: number;
    viajeId: number;
    descripcion: string;
    distanciaKm: number;
  }
  
  export interface Viaje {
    viajeId: number;
    fecha: Date;
    sucursalId: number;
    usuarioId: number;
    transportistaId: number;
    totalDistancia: number;
    totalCosto: number;
    detalleViajes: DetalleViaje[];
  }
  