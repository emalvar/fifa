// import { Component, OnInit } from '@angular/core';
// import { JugadoresService } from '../jugadores';
// import Chart from 'chart.js/auto';
// import { ChartConfiguration } from 'chart.js';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-jugador-detalles',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './jugador-detalles.html',
//   styleUrls: ['./jugador-detalles.scss'],
// })
// export class JugadorDetallesComponent implements OnInit {
//   jugadorId: number | null = null;
//   jugador: any;
//   jugadorCopia: any; 
//   chart: any;
//   chartData: any;
//   modoEdicion: boolean = false; 

//   constructor(private jugadoresService: JugadoresService) {}

//   ngOnInit(): void {}

//   buscarJugador(): void {
//     if (this.jugadorId) {
//       this.jugadoresService.getJugadorById(this.jugadorId).subscribe((data) => {
//         this.jugador = data;
//         this.jugadorCopia = { ...data }; 
//         this.actualizarGrafico();
//         this.modoEdicion = false;
//       });
//     }
//   }

//   activarModoEdicion(): void {
//     this.modoEdicion = true;
//   }

//   guardarCambios(): void {
//     if (this.jugadorCopia && this.jugadorCopia.player_id) {
//       this.jugadoresService.updateJugador(this.jugadorCopia.player_id, this.jugadorCopia).subscribe(
//         (response) => {
//           console.log(response.message);
//           this.jugador = { ...this.jugadorCopia };
//           this.modoEdicion = false;
//           this.actualizarGrafico();
//         },
//         (error) => {
//           console.error('Error al guardar cambios:', error);
//         }
//       );
//     }
//   }

//   actualizarGrafico(): void {
//     if (!this.jugador) {
//       return;
//     }

//     const habilidades = [
//       'overall',
//       'potential',
//       'skill_moves',
//       'international_reputation',
//       'weak_foot',
//       'pace',
//       'shooting',
//       'passing',
//       'dribbling',
//       'defending',
//       'physic',
//     ];

//     const habilidadesDisponibles = habilidades.filter((habilidad) =>
//       this.jugador.hasOwnProperty(habilidad)
//     );

//     this.chartData = {
//       labels: habilidadesDisponibles.map((habilidad) => {
//         return habilidad.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
//       }),
//       datasets: [
//         {
//           label: 'Habilidades',
//           data: habilidadesDisponibles.map((habilidad) => this.jugador[habilidad]),
//           fill: true,
//           backgroundColor: 'rgba(54, 162, 235, 0.2)',
//           borderColor: 'rgb(54, 162, 235)',
//           pointBackgroundColor: 'rgb(54, 162, 235)',
//           pointBorderColor: '#fff',
//           pointHoverBackgroundColor: '#fff',
//           pointHoverBorderColor: 'rgb(54, 162, 235)',
//         },
//       ],
//     };

//     if (this.chart) {
//       this.chart.destroy();
//     }

//     const config: ChartConfiguration<'radar'> = {
//       type: 'radar',
//       data: this.chartData,
//       options: {
//         responsive: true,
//         scales: {
//           r: {
//             angleLines: {
//               display: false,
//             },
//             suggestedMin: 0,
//             suggestedMax: 100,
//             pointLabels: {
//               font: {
//                 size: 14,
//               },
//             },
//           },
//         },
//       },
//     };

//     this.chart = new Chart('jugadorHabilidadesChart', config);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute
import { JugadoresService } from '../jugadores';
import Chart from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jugador-detalles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jugador-detalles.html',
  styleUrls: ['./jugador-detalles.scss'],
})
export class JugadorDetallesComponent implements OnInit {
  jugadorId: number | null = null;
  jugador: any;
  jugadorCopia: any;
  chart: any;
  chartData: any;
  modoEdicion: boolean = false;

  constructor(
    private jugadoresService: JugadoresService,
    private route: ActivatedRoute // Inyectar ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Suscribirse a los parámetros de la URL para obtener el ID
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        // Convertir el id a número, ya que el servicio lo espera así
        this.jugadorId = +params['id']; 
        this.buscarJugador();
      }
    });
  }

  buscarJugador(): void {
    if (this.jugadorId) {
      this.jugadoresService.getJugadorById(this.jugadorId).subscribe((data) => {
        this.jugador = data;
        this.jugadorCopia = { ...data };
        this.actualizarGrafico();
        this.modoEdicion = false;
      });
    }
  }

  activarModoEdicion(): void {
    this.modoEdicion = true;
  }

  guardarCambios(): void {
    if (this.jugadorCopia && this.jugadorCopia.player_id) {
      this.jugadoresService.updateJugador(this.jugadorCopia.player_id, this.jugadorCopia).subscribe(
        (response) => {
          console.log(response.message);
          this.jugador = { ...this.jugadorCopia };
          this.modoEdicion = false;
          this.actualizarGrafico();
        },
        (error) => {
          console.error('Error al guardar cambios:', error);
        }
      );
    }
  }

  actualizarGrafico(): void {
    if (!this.jugador) {
      return;
    }

    const habilidades = [
      'overall',
      'potential',
      'skill_moves',
      'international_reputation',
      'weak_foot',
      'pace',
      'shooting',
      'passing',
      'dribbling',
      'defending',
      'physic',
    ];

    const habilidadesDisponibles = habilidades.filter((habilidad) =>
      this.jugador.hasOwnProperty(habilidad)
    );

    this.chartData = {
      labels: habilidadesDisponibles.map((habilidad) => {
        return habilidad.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      }),
      datasets: [
        {
          label: 'Habilidades',
          data: habilidadesDisponibles.map((habilidad) => this.jugador[habilidad]),
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)',
        },
      ],
    };

    if (this.chart) {
      this.chart.destroy();
    }

    const config: ChartConfiguration<'radar'> = {
      type: 'radar',
      data: this.chartData,
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: {
              display: false,
            },
            suggestedMin: 0,
            suggestedMax: 100,
            pointLabels: {
              font: {
                size: 14,
              },
            },
          },
        },
      },
    };

    this.chart = new Chart('jugadorHabilidadesChart', config);
  }
}
