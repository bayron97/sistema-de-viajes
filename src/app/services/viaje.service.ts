import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Viaje } from '../interfaces/viaje';
import { environment } from '../../environments/environment';
import { Sucursal } from '../interfaces/sucursal';
import { Transportista } from '../interfaces/transportista';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  private apiUrl = `${environment.baseUrl}Viaje`;

  constructor(private http: HttpClient) {}

  // Obtener todos los viajes
  getViajes(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener viaje por ID
  getViajeById(id: number): Observable<Viaje> {
    return this.http.get<Viaje>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Crear un nuevo viaje
  createViaje(viaje: Viaje): Observable<Viaje> {
    return this.http.post<Viaje>(this.apiUrl, viaje).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un viaje existente
  updateViaje(viaje: Viaje): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${viaje.viajeId}`, viaje).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un viaje por ID
  deleteViaje(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Ocurrió un error inesperado.';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error del lado del cliente:', error.error.message);
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      console.error(`Código de error: ${error.status}, ` + `Mensaje: ${error.error.message}`);
      
      // Usar el mensaje proporcionado por el backend si está disponible
      errorMsg = error.error?.message || 'Error en el servidor';
    }
    
    alert(errorMsg);
    return throwError(() => new Error(errorMsg));
  }
}
