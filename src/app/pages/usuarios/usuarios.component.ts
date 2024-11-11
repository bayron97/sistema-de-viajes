import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  errorMessage = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

 
  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => (this.usuarios = data),
      error: (err) => (this.errorMessage = 'Error al cargar los usuarios')
    });
  }

 
  navegarACrear() {
    this.router.navigate(['/form-usuario']);
  }


  navegarAEditar(usuarioId: number) {
    this.router.navigate(['/form-usuario', usuarioId]);
  }

  
  deleteUsuario(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe({
        next: () => this.loadUsuarios(),
        error: () => (this.errorMessage = 'Error al eliminar el usuario')
      });
    }
  }
}
