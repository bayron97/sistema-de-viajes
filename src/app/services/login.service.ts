import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  post(endpoint: string, data: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}${endpoint}`, data);
  }
}
