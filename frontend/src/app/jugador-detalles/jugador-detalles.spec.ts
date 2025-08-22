import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorDetallesComponent } from './jugador-detalles';

describe('JugadorDetallesComponent', () => {
  let component: JugadorDetallesComponent;
  let fixture: ComponentFixture<JugadorDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
