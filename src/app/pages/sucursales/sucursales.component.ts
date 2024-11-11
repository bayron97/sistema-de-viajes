import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../services/sucursal.service';
import { Sucursal } from '../../interfaces/sucursal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
  sucursales: Sucursal[] = [];
  errorMessage = '';

  constructor(
    private sucursalService: SucursalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSucursales();
  }

  loadSucursales() {
    this.sucursalService.getSucursales().subscribe({
      next: (data) => (this.sucursales = data),
      error: () => (this.errorMessage = 'Error al cargar las sucursales')
    });
  }

  navegarACrear() {
    this.router.navigate(['/form-sucursal']);
  }

  navegarAEditar(sucursalId: number) {
    this.router.navigate(['/form-sucursal', sucursalId]);
  }

  deleteSucursal(id: number) {
    if (confirm('¿Estás seguro de eliminar esta sucursal?')) {
      this.sucursalService.deleteSucursal(id).subscribe({
        next: () => this.loadSucursales(),
        error: () => (this.errorMessage = 'Error al eliminar la sucursal')
      });
    }
  }
}
