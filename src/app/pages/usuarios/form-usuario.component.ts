import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  usuarioId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.usuarioId) {
      this.loadUsuario();
    }
  }

  loadUsuario() {
    if (this.usuarioId) {
      this.usuarioService.getUsuarioById(this.usuarioId).subscribe(usuario => {
        this.usuarioForm.patchValue(usuario);
      });
    }
  }

  onSubmit() {
    if (this.usuarioForm.invalid) return;

    const usuario: Usuario = this.usuarioForm.value;

    if (this.usuarioId) {
      usuario.usuarioId = this.usuarioId;
      this.usuarioService.updateUsuario(usuario).subscribe(() => this.router.navigate(['/usuarios']));
    } else {
      this.usuarioService.createUsuario(usuario).subscribe(() => this.router.navigate(['/usuarios']));
    }
  }
}
