import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ViajeService } from '../../services/viaje.service';
import { SucursalService } from '../../services/sucursal.service';
import { EmpleadoService } from '../../services/empleado.service';
import { Router } from '@angular/router';
import { TransportistaService } from '../../services/transportista.sevice';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-form-viaje',
  templateUrl: './form-viaje.component.html',
  styleUrls: ['./form-viaje.component.css']
})
export class FormViajeComponent implements OnInit {
  viajeForm!: FormGroup;
  sucursales: any[] = [];
  transportistas: any[] = [];
  empleados: any[] = [];
  detalleViajes!: FormArray;
  viajeId: number | null = null;
  usuarioId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private viajeService: ViajeService,
    private sucursalService: SucursalService,
    private empleadoService: EmpleadoService,
    private transportistaService: TransportistaService,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.viajeForm = this.fb.group({
      fecha: ['', Validators.required],
      sucursalId: ['', Validators.required],
      transportistaId: ['', Validators.required],
      totalCosto: [{ value: 0, disabled: true }],
      totalDistancia: [0, Validators.required],
      detalleViajes: this.fb.array([])
    });

    this.usuarioId = Number(this.loginService.getUserid());
    this.detalleViajes = this.viajeForm.get('detalleViajes') as FormArray;


    this.loadSucursales();
    this.loadTransportistas();
    this.onSucursalChange();
  }

  loadSucursales() {
    this.sucursalService.getSucursales().subscribe((data) => {
      this.sucursales = data.map(sucursal => ({
        id: sucursal.sucursalId,
        nombreSucursal: sucursal.nombre
      }));
    });
  }

  loadTransportistas() {
    this.transportistaService.getTransportistas().subscribe((data) => {
      this.transportistas = data.map(transportista => ({
        id: transportista.transportistaId,
        nombreTransportista: transportista.nombre,
        tarifaKm: transportista.tarifaPorKm
      }));
    });
  }

  onSucursalChange() {
    this.viajeForm.get('sucursalId')?.valueChanges.subscribe((sucursalId) => {
      if (sucursalId) {
        this.loadEmpleadosBySucursal(sucursalId);
        this.calculateCostoTotal();
      }
    });
  }

  onTransportistaChange() {
    this.viajeForm.get('transportistaId')?.valueChanges.subscribe((transportistaId) => {
      if (transportistaId) {
        this.calculateCostoTotal();
      }
    });
  }

  onDetalleChange() {

    this.calculateCostoTotal();
  }

  loadEmpleadosBySucursal(sucursalId: number): void {
    this.empleadoService.getEmpleadosBySucursal(sucursalId).subscribe(
      (data: any) => {


        const empleadosData = Array.isArray(data) ? data : [data];
        this.empleados = empleadosData.map(empleado => ({
          empleadoId: empleado.empleadoId,
          nombreEmpleado: empleado.nombreEmpleado,
          distanciaKm: empleado.distanciaKm
        }));


      },
      (error) => {
        console.error('Error al cargar empleados:', error);
        this.empleados = [];
      }
    );
  }


  get detalleViajesControls() {
    return this.detalleViajes.controls;
  }

  addDetalle() {

    const detalleForm = this.fb.group({
      empleadoId: ['', Validators.required],
      distanciaKm: [0, Validators.required]
    });

    detalleForm.get('distanciaKm')?.valueChanges.subscribe(() => {
      this.updateTotalDistancia();
    });

    this.detalleViajes.push(detalleForm);
    this.updateTotalDistancia();
  }

  removeDetalle(index: number) {
    this.detalleViajes.removeAt(index);
    this.updateTotalDistancia();
  }


  onEmpleadoChange(index: number) {

    const empleadoId = +this.detalleViajes.at(index).get('empleadoId')?.value;



    const empleadoSeleccionado = this.empleados.find(empleado => empleado.empleadoId === empleadoId);

   

    if (empleadoSeleccionado) {

      this.detalleViajes.at(index).get('distanciaKm')?.setValue(empleadoSeleccionado.distanciaKm);
    }
    this.calculateCostoTotal();
  }

  calculateCostoTotal() {

    const totalDistancia = this.viajeForm.get('totalDistancia')?.value;


    const transportistaId = +this.viajeForm.get('transportistaId')?.value;
    const transportista = this.transportistas.find(t => t.id === transportistaId);

    if (transportista && totalDistancia !== null) {
      const costoTotal = transportista.tarifaKm * totalDistancia;

      this.viajeForm.get('totalCosto')?.setValue(costoTotal);
    }
  }


  updateTotalDistancia(): void {
    const totalDistancia = this.detalleViajes.controls.reduce((sum, detalleForm) => {
      const distancia = detalleForm.get('distanciaKm')?.value || 0;
      return sum + distancia;
    }, 0);


    this.viajeForm.get('totalDistancia')?.setValue(totalDistancia);
  }

  cancelar() {
    this.router.navigate(['/viajes']);
  }

  onSubmit(): void {

    if (this.viajeForm.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    const usuarioId = Number(this.loginService.getUserid());
    if (!usuarioId) {
      alert('Error: No se pudo determinar el usuario logueado.');
      return;
    }



    const nuevoViaje = {
      ...this.viajeForm.value,
      totalCosto: this.viajeForm.get('totalCosto')?.value,
      usuarioId,
    };

    this.viajeService.createViaje(nuevoViaje).subscribe(
      () => {
        alert('Viaje registrado con éxito');
        this.router.navigate(['/viajes']);
      },
      (error) => {
        console.error('Error al registrar viaje:', error);
      }
    );
  }
}
