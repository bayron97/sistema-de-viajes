import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Login } from '../../interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    // Inicializar el formulario con validaciones
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
  if (this.loginForm.invalid) return;

  const { usuario, password } = this.loginForm.value;
  const loginData: Login = {
    credencial: usuario,
    password: password
  };

  try {
    const response = await this.loginService.login('Usuario/login', loginData).toPromise();

    if (response) {
      
      if (response.rol) {
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('idUser', response.usuarioId);
        localStorage.setItem('userRole', response.rol); 
        localStorage.setItem('userName', response.nombreUsuario);
        
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/menu']);
      } else {
        this.loginError = 'No se pudo obtener el rol del usuario.';
      }
    } else {
      this.loginError = 'Usuario o contraseña incorrectos.';
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    this.loginError = 'Error al iniciar sesión. Intente de nuevo más tarde.';
  }
}
}
