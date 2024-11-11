import { DecimalPipe } from "@angular/common";

export interface Transportista {
    transportistaId: number,
    nombre: string,
    tarifaPorKm: number,
    telefono: string,
    estado: boolean

}