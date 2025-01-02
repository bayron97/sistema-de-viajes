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
import { FormViajeComponent } from './viajes/form-viaje.component';
import { MenuComponent } from '../menu/menu.component';
import { ReportesComponent } from '../pages/reportes/reportes.component';



@NgModule({
  declarations: [
    MenuComponent,
    UsuariosComponent,
    FormUsuarioComponent,
    ViajesComponent,
    FormViajeComponent,
    SucursalesComponent,
    FormSucursalComponent,
    TransportistasComponent,
    FormTransportistaComponent,
    AsignarSucursalesComponent,
    FormAsignarSucursalComponent,
    EmpleadosComponent,
    FormEmpleadoComponent,
    ReportesComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
