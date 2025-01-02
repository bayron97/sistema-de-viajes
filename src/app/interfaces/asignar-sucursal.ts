import { Empleado } from "./empleado";

export interface AsignarSucursal {
    asignacionId: number;
    empleadoId: number;
    sucursalId: number;
    distanciaKm: number;
    nombreEmpleado: string;
    nombreSucursal: string;
}