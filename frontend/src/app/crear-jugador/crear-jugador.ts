import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../jugadores';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-jugador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-jugador.html',
  styleUrls: ['./crear-jugador.scss']
})
export class CrearJugadorComponent implements OnInit {
  nuevoJugador: any = {};

  constructor(private jugadoresService: JugadoresService) { }

  ngOnInit(): void {
  }

  crearJugador(): void {
    this.jugadoresService.createJugador(this.nuevoJugador).subscribe(response => {
      console.log('Jugador creado:', response.data);
      alert('Jugador creado correctamente!');
      this.nuevoJugador = {};
    }, error => {
      console.error('Error al crear el jugador:', error);
      alert('Error al crear el jugador.');
    });
  }
}