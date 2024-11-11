import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../interfaces/empleado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  errorMessage = '';

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmpleados();
  }


  loadEmpleados() {
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => (this.empleados = data),
      error: (err) => (this.errorMessage = 'Error al cargar los empleados')
    });
  }


  navegarACrear() {
    this.router.navigate(['/form-empleado']);
  }

  navegarAEditar(empleadoId: number) {
    this.router.navigate(['/form-empleado', empleadoId]);
  }

  
  deleteEmpleado(id: number) {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(id).subscribe({
        next: () => this.loadEmpleados(),
        error: () => (this.errorMessage = 'Error al eliminar el empleado')
      });
    }
  }
}
