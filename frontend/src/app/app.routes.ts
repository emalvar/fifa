import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { JugadoresListComponent } from './jugadores-list/jugadores-list';
import { JugadorDetallesComponent } from './jugador-detalles/jugador-detalles';
import { CrearJugadorComponent } from './crear-jugador/crear-jugador';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { AuthGuard } from './guards/auth-guard';
import { AppComponent } from './app';

 export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'jugadores', component: JugadoresListComponent, canActivate: [AuthGuard] },
  { path: 'jugador/search', component: JugadorDetallesComponent, canActivate: [AuthGuard] },
  { path: 'jugador/create', component: CrearJugadorComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
