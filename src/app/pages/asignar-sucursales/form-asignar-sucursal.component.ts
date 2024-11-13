import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignarSucursalService } from '../../services/asignar-sucursal.service';
import { EmpleadoService } from '../../services/empleado.service';
import { SucursalService } from '../../services/sucursal.service';
import { AsignarSucursal } from '../../interfaces/asignar-sucursal';
import { Empleado } from '../../interfaces/empleado';
import { Sucursal } from '../../interfaces/sucursal';

@Component({
  selector: 'app-form-asignar-sucursal',
  templateUrl: './form-asignar-sucursal.component.html',
  styleUrls: ['./form-asignar-sucursal.component.css']
})
export class FormAsignarSucursalComponent implements OnInit {
  asignacionForm: FormGroup;
  asignacionId: number | null = null;
  empleados: Empleado[] = [];
  sucursales: Sucursal[] = [];

  constructor(
    private fb: FormBuilder,
    private asignarSucursalService: AsignarSucursalService,
    private empleadoService: EmpleadoService,
    private sucursalService: SucursalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.asignacionForm = this.fb.group({
      empleadoId: ['', Validators.required],
      sucursalId: ['', Validators.required],
      distanciaKm: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.asignacionId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEmpleados();
    this.loadSucursales();
    if (this.asignacionId) {
      this.loadAsignacion();
    }
  }

  loadEmpleados() {
    this.empleadoService.getEmpleados().subscribe(empleados => {
      this.empleados = empleados;
    });
  }

  loadSucursales() {
    this.sucursalService.getSucursales().subscribe(sucursales => {
      this.sucursales = sucursales;
    });
  }

  loadAsignacion() {
    if (this.asignacionId) {
      this.asignarSucursalService.getAsignacionById(this.asignacionId).subscribe(asignacion => {
        this.asignacionForm.patchValue(asignacion);
      });
    }
  }

  onSubmit() {
    if (this.asignacionForm.invalid) return;

    const asignacion: AsignarSucursal = this.asignacionForm.value;

    if (this.asignacionId) {
      this.asignarSucursalService.updateAsignacion(this.asignacionId, asignacion)
        .subscribe(() => this.router.navigate(['/asignar-sucursal']));
    } else {
      this.asignarSucursalService.createAsignacion(asignacion)
        .subscribe(() => this.router.navigate(['/asignar-sucursal']));
    }
  }
}
