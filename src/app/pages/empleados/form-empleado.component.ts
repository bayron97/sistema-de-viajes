import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../interfaces/empleado';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {
  empleadoForm: FormGroup;
  empleadoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.empleadoForm = this.fb.group({
      nombreEmpleado: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      estado: [ Validators.required]
    });
  }

  ngOnInit(): void {
    this.empleadoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.empleadoId) {
      this.loadEmpleado();
    }
  }

  loadEmpleado() {
    if (this.empleadoId) {
      this.empleadoService.getEmpleadoById(this.empleadoId).subscribe(empleado => {
        this.empleadoForm.patchValue(empleado);
      });
    }
  }

  onSubmit() {
    if (this.empleadoForm.invalid) return;

    const empleado: Empleado = this.empleadoForm.value;

    if (this.empleadoId) {
      empleado.empleadoId = this.empleadoId;
      this.empleadoService.updateEmpleado(empleado).subscribe(() => this.router.navigate(['/empleados']));
    } else {
      this.empleadoService.createEmpleado(empleado).subscribe(() => this.router.navigate(['/empleados']));
    }
  }
}
