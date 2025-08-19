import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
        console.log('Registro exitoso', response);
      },
      error: (error) => {
        this.errorMessage = error.error.msg || 'Hubo un error en el registro.';
        console.error('Error en el registro', error);
      }
    });
  }
}