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
import { FormAsignarSucursalComponent } from './pages/asignar-sucursales/form-asignar-sucursal.component';
import { FormViajeComponent } from './pages/viajes/form-viaje.component';
import { AuthGuard } from './guards/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

const routes: Routes = [

  
  { path: '', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'form-usuario', component: FormUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'form-usuario/:id', component: FormUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'viajes', component: ViajesComponent, canActivate: [AuthGuard] },
  { path: 'sucursales', component: SucursalesComponent, canActivate: [AuthGuard] },
  { path: 'form-viaje', component: FormViajeComponent, canActivate: [AuthGuard] },
  { path: 'form-viaje/:id', component: FormViajeComponent, canActivate: [AuthGuard] },
  { path: 'form-sucursal', component: FormSucursalComponent, canActivate: [AuthGuard] },
  { path: 'form-sucursal/:id', component: FormSucursalComponent, canActivate: [AuthGuard] },
  { path: 'transportistas', component: TransportistasComponent, canActivate: [AuthGuard] },
  { path: 'form-transportista', component: FormTransportistaComponent, canActivate: [AuthGuard] },
  { path: 'form-transportista/:id', component: FormTransportistaComponent, canActivate: [AuthGuard] },
  { path: 'asignar-sucursales', component: AsignarSucursalesComponent, canActivate: [AuthGuard] },
  { path: 'form-asignar-sucursal', component: FormAsignarSucursalComponent, canActivate: [AuthGuard] },
  { path: 'form-asignar-sucursal/:id', component: FormAsignarSucursalComponent, canActivate: [AuthGuard] },
  { path: 'empleados', component: EmpleadosComponent, canActivate: [AuthGuard] },
  { path: 'form-empleado', component: FormEmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'form-empleado/:id', component: FormEmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
