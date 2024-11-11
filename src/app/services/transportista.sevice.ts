import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Transportista } from '../interfaces/transportista';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportistaService {
  private apiUrl = `${environment.baseUrl}Transportista`;

  constructor(private http: HttpClient) {}

  getTransportistas(): Observable<Transportista[]> {
    return this.http.get<Transportista[]>(this.apiUrl);
  }

  getTransportistaById(id: number): Observable<Transportista> {
    return this.http.get<Transportista>(`${this.apiUrl}/${id}`);
  }

  createTransportista(transportista: Transportista): Observable<Transportista> {
    return this.http.post<Transportista>(this.apiUrl, transportista);
  }

  updateTransportista(transportista: Transportista): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${transportista.transportistaId}`, transportista);
  }

  deleteTransportista(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
