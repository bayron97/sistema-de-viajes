import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

 login(endpoint: string, data: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}${endpoint}`, data);
  }

  handleLoginResponse(response: any): void {
    if (response && response.rol) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('idUser', response.usuarioId);
      localStorage.setItem('userRole', response.rol);
      localStorage.setItem('userName', response.nombreUsuario);
      this.router.navigate(['/dashboard']);
    }
  }
  

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getUserid(): string | null {
    return localStorage.getItem('idUser');
  }
  
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
  
  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
