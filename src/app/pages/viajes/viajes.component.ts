import { Component, OnInit } from '@angular/core';
import { ViajeService } from '../../services/viaje.service';
import { Router } from '@angular/router';
import { Viaje } from '../../interfaces/viaje';
import { SucursalService } from '../../services/sucursal.service';  
import { TransportistaService } from '../../services/transportista.sevice';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {
  viajes: Viaje[] = [];
  sucursales: any[] = [];
  transportistas: any[] = [];
  userRole: string | null = '';

  constructor(
    private viajeService: ViajeService,
    private router: Router,
    private sucursalService: SucursalService, 
    private transportistaService: TransportistaService,  
    private loginService: LoginService
  ) {}

  ngOnInit(): void {

    this.userRole = this.loginService.getUserRole();
    
    if (this.userRole !== 'Gerente de tienda') {
      alert('Acceso denegado: Solo los gerentes de tienda pueden acceder a esta sección.');
      this.router.navigate(['/menu']);
      return;
    }
    this.loadViajes();
    this.loadSucursales();
    this.loadTransportistas();
  }

  loadViajes(): void {
    this.viajeService.getViajes().subscribe((data) => {
      this.viajes = data;
    });
  }

  loadSucursales(): void {
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursales = data;
    });
  }

  loadTransportistas(): void {
    this.transportistaService.getTransportistas().subscribe((data) => {
      this.transportistas = data;
    });
  }

  getSucursalName(sucursalId: number): string {
    const sucursal = this.sucursales.find(s => s.sucursalId === sucursalId);
    return sucursal ? sucursal.nombre : 'Desconocido';
  }

  getTransportistaName(transportistaId: number): string {
    const transportista = this.transportistas.find(t => t.transportistaId === transportistaId);
    return transportista ? transportista.nombre : 'Desconocido';
  }

  navegarACrear() {
    this.router.navigate(['/form-viaje']);
  }

  navegarAEditar(viajeId: number) {
    this.router.navigate(['/form-viaje', viajeId]);
  }

  deleteViaje(id: number): void {
    this.viajeService.deleteViaje(id).subscribe(() => {
      this.loadViajes();
    });
  }
}
