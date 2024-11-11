import { Component, OnInit } from '@angular/core';
import { Transportista } from '../../interfaces/transportista';
import { Router } from '@angular/router';
import { TransportistaService } from '../../services/transportista.sevice';

@Component({
  selector: 'app-transportistas',
  templateUrl: './transportistas.component.html',
  styleUrls: ['./transportistas.component.css']
})
export class TransportistasComponent implements OnInit {
  transportistas: Transportista[] = [];
  errorMessage = '';

  constructor(
    private transportistaService: TransportistaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTransportistas();
  }

  loadTransportistas() {
    this.transportistaService.getTransportistas().subscribe({
      next: (data) => (this.transportistas = data),
      error: () => (this.errorMessage = 'Error al cargar los transportistas')
    });
  }

  navegarACrear() {
    this.router.navigate(['/form-transportista']);
  }

  navegarAEditar(transportistaId: number) {
    this.router.navigate(['/form-transportista', transportistaId]);
  }

  deleteTransportista(id: number) {
    if (confirm('¿Estás seguro de eliminar este transportista?')) {
      this.transportistaService.deleteTransportista(id).subscribe({
        next: () => this.loadTransportistas(),
        error: () => (this.errorMessage = 'Error al eliminar el transportista')
      });
    }
  }
}
