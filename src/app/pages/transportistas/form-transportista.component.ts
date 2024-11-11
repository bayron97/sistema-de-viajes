import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transportista } from '../../interfaces/transportista';
import { TransportistaService } from '../../services/transportista.sevice';

@Component({
  selector: 'app-form-transportista',
  templateUrl: './form-transportista.component.html',
  styleUrls: ['./form-transportista.component.css']
})
export class FormTransportistaComponent implements OnInit {
  transportistaForm: FormGroup;
  transportistaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private transportistaService: TransportistaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.transportistaForm = this.fb.group({
      nombre: ['', Validators.required],
      tarifaPorKm: [0, Validators.required],
      telefono: ['', Validators.required],
      estado: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.transportistaId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.transportistaId) {
      this.loadTransportista();
    }
  }

  loadTransportista() {
    if (this.transportistaId) {
      this.transportistaService.getTransportistaById(this.transportistaId).subscribe(transportista => {
        this.transportistaForm.patchValue(transportista);
      });
    }
  }

  onSubmit() {
    if (this.transportistaForm.invalid) return;

    const transportista: Transportista = this.transportistaForm.value;

    if (this.transportistaId) {
      transportista.transportistaId = this.transportistaId;
      this.transportistaService.updateTransportista(transportista).subscribe(() => this.router.navigate(['/transportistas']));
    } else {
      this.transportistaService.createTransportista(transportista).subscribe(() => this.router.navigate(['/transportistas']));
    }
  }
}
