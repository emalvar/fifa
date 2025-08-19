import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorDetalles } from './jugador-detalles';

describe('JugadorDetalles', () => {
  let component: JugadorDetalles;
  let fixture: ComponentFixture<JugadorDetalles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorDetalles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorDetalles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
