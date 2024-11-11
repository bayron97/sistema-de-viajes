import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sucursal } from '../../interfaces/sucursal';
import { SucursalService } from '../../services/sucursal.service';

@Component({
  selector: 'app-form-sucursal',
  templateUrl: './form-sucursal.component.html',
  styleUrls: ['./form-sucursal.component.css']
})
export class FormSucursalComponent implements OnInit {
  sucursalForm: FormGroup;
  sucursalId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private sucursalService: SucursalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.sucursalForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.sucursalId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.sucursalId) {
      this.loadSucursal();
    }
  }

  loadSucursal() {
    if (this.sucursalId) {
      this.sucursalService.getSucursalById(this.sucursalId).subscribe(sucursal => {
        this.sucursalForm.patchValue(sucursal);
      });
    }
  }

  onSubmit() {
    if (this.sucursalForm.invalid) return;

    const sucursal: Sucursal = this.sucursalForm.value;

    if (this.sucursalId) {
      sucursal.sucursalId = this.sucursalId;
      this.sucursalService.updateSucursal(sucursal).subscribe(() => this.router.navigate(['/sucursales']));
    } else {
      this.sucursalService.createSucursal(sucursal).subscribe(() => this.router.navigate(['/sucursales']));
    }
  }
}
