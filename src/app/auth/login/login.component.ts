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
      const response = await this.loginService.post('Usuario/login', loginData).toPromise();
      if (response) {
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/viajes']);
      }
    } catch (error) {
      console.error(error);
      this.loginError = 'Usuario o contraseña incorrectos.';
    }
  }
}
