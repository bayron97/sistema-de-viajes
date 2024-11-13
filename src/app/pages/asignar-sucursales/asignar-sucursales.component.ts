import { Component, OnInit } from '@angular/core';
import { AsignarSucursal } from '../../interfaces/asignar-sucursal';
import { Router } from '@angular/router';
import { AsignarSucursalService } from '../../services/asignar-sucursal.service';

@Component({
  selector: 'app-asignar-sucursal',
  templateUrl: './asignar-sucursales.component.html',
  styleUrls: ['./asignar-sucursales.component.css']
})
export class AsignarSucursalesComponent implements OnInit {
  asignaciones: AsignarSucursal[] = [];
  errorMessage = '';

  constructor(
    private asignarSucursalService: AsignarSucursalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAsignaciones();
  }

  loadAsignaciones() {
    this.asignarSucursalService.getAsignaciones().subscribe({
      next: (data) => (this.asignaciones = data),
      error: () => (this.errorMessage = 'Error al cargar las asignaciones')
    });
  }

  navegarACrear() {
    this.router.navigate(['/form-asignar-sucursal']);
  }

  navegarAEditar(asignacionId: number) {
    this.router.navigate(['/form-asignar-sucursal', asignacionId]);
  }

  deleteAsignacion(id: number) {
    if (confirm('¿Estás seguro de eliminar esta asignación?')) {
      this.asignarSucursalService.deleteAsignacion(id).subscribe({
        next: () => this.loadAsignaciones(),
        error: () => (this.errorMessage = 'Error al eliminar la asignación')
      });
    }
  }
}
