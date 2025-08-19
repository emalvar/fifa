import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JugadoresService {
  private apiUrl = 'http://localhost:3000/api/jugadores';

  constructor(private http: HttpClient) {}

  getJugadores(page: number, limit: number, filtros: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());

    if (filtros.name) {
      params = params.set('name', filtros.name);
    }
    if (filtros.club) {
      params = params.set('club', filtros.club);
    }
    if (filtros.nationality) {
      params = params.set('nationality', filtros.nationality);
    }

    return this.http.get(this.apiUrl, { params });
  }

  getJugadorById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateJugador(id: number, jugador: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, jugador);
  }

  createJugador(jugador: any): Observable<any> {
    return this.http.post(this.apiUrl, jugador);
  }

  downloadCsv(filtros: any): void {
    let params = new HttpParams();
    if (filtros.name) {
      params = params.append('name', filtros.name);
    }
    if (filtros.club) {
      params = params.append('club', filtros.club);
    }
    if (filtros.nationality) {
      params = params.append('nationality', filtros.nationality);
    }

    this.http
      .get(`${this.apiUrl}/export-csv`, { params, responseType: 'blob' })
      .subscribe((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jugadores.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
  }
}
