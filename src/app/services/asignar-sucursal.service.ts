import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AsignarSucursal } from '../interfaces/asignar-sucursal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignarSucursalService {
  private apiUrl = `${environment.baseUrl}AsignarSucursale`;

  constructor(private http: HttpClient) {}

  
  getAsignaciones(): Observable<AsignarSucursal[]> {
    return this.http.get<AsignarSucursal[]>(this.apiUrl);
  }

 
  getAsignacionById(id: number): Observable<AsignarSucursal> {
    return this.http.get<AsignarSucursal>(`${this.apiUrl}/${id}`);
  }

  
  createAsignacion(asignacion: AsignarSucursal): Observable<AsignarSucursal> {
    return this.http.post<AsignarSucursal>(this.apiUrl, asignacion);
  }


  updateAsignacion(id: number, asignacion: AsignarSucursal): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, asignacion);
  }

 
  deleteAsignacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
