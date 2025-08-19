import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JugadoresService } from '../jugadores';

@Component({
  selector: 'app-jugadores-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './jugadores-list.html',
  styleUrls: ['./jugadores-list.css']
})
export class JugadoresListComponent implements OnInit {
  title = 'fifa-frontend';
  jugadores: any[] = [];
  currentPage = 1;
  totalPages = 0;
  totalPlayers = 0;
  isLoading = false;
  filtros = {
    name: '',
    club: '',
    nationality: ''
  };

  constructor(private jugadoresService: JugadoresService) { }

  ngOnInit(): void {
    this.fetchJugadores();
  }

  fetchJugadores(): void {
    this.isLoading = true;
    this.jugadoresService.getJugadores(this.currentPage, 20, this.filtros)
      .subscribe(response => {
        this.jugadores = response.data;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
        this.totalPlayers = response.totalPlayers;
        this.isLoading = false;
      }, error => {
        console.error('Error al obtener jugadores:', error);
        this.isLoading = false;
      });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.fetchJugadores();
  }

  onFiltrosChange(): void {
    this.currentPage = 1;
    this.fetchJugadores();
  }

    downloadCsv(): void {
    this.jugadoresService.downloadCsv(this.filtros);
  }

}
