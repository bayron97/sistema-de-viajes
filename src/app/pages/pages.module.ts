import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ViajesComponent } from './viajes/viajes.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { TransportistasComponent } from './transportistas/transportistas.component';
import { AsignarSucursalesComponent } from './asignar-sucursales/asignar-sucursales.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormUsuarioComponent } from './usuarios/form-usuario.component';
import { FormEmpleadoComponent } from './empleados/form-empleado.component';
import { FormTransportistaComponent } from './transportistas/form-transportista.component';
import { FormSucursalComponent } from './sucursales/form-sucursal.component';
import { FormAsignarSucursalComponent } from './asignar-sucursales/form-asignar-sucursal.component';



@NgModule({
  declarations: [
    UsuariosComponent,
    FormUsuarioComponent,
    ViajesComponent,
    SucursalesComponent,
    FormSucursalComponent,
    TransportistasComponent,
    FormTransportistaComponent,
    AsignarSucursalesComponent,
    FormAsignarSucursalComponent,
    EmpleadosComponent,
    FormEmpleadoComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
