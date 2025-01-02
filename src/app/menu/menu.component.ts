import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router, private loginService: LoginService) {}

  navegarAUsuarios() {
    this.router.navigate(['/usuarios']);
  }

  navegarAViajes() {
    this.router.navigate(['/viajes']);
  }

  navegarASucursales() {
    this.router.navigate(['/sucursales']);
  }

  navegarATransportistas() {
    this.router.navigate(['/transportistas']);
  }

  navegarAAsignarSucursales() {
    this.router.navigate(['/asignar-sucursales']);
  }

  navegarAEmpleados() {
    this.router.navigate(['/empleados']);
  }

  navegarAReportes() {
    this.router.navigate(['/reportes']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
