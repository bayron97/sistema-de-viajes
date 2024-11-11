import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ViajesComponent } from './pages/viajes/viajes.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { TransportistasComponent } from './pages/transportistas/transportistas.component';
import { AsignarSucursalesComponent } from './pages/asignar-sucursales/asignar-sucursales.component';
import { FormUsuarioComponent } from './pages/usuarios/form-usuario.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { FormEmpleadoComponent } from './pages/empleados/form-empleado.component';
import { FormTransportistaComponent } from './pages/transportistas/form-transportista.component';
import { FormSucursalComponent } from './pages/sucursales/form-sucursal.component';

const routes: Routes = [

  
  { path: '', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'form-usuario', component: FormUsuarioComponent },
  { path: 'form-usuario/:id', component: FormUsuarioComponent },
  { path: 'viajes', component: ViajesComponent },
  { path: 'sucursales', component: SucursalesComponent },
  { path: 'form-sucursal', component: FormSucursalComponent },
  { path: 'form-sucursal/:id', component: FormSucursalComponent },
  { path: 'transportistas', component: TransportistasComponent },
  { path: 'form-transportista', component: FormTransportistaComponent },
  { path: 'form-transportista/:id', component: FormTransportistaComponent },
  { path: 'asignar-sucursales', component: AsignarSucursalesComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'form-empleado', component: FormEmpleadoComponent },
  { path: 'form-empleado/:id', component: FormEmpleadoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
