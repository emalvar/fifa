import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresList } from './jugadores-list';

describe('JugadoresList', () => {
  let component: JugadoresList;
  let fixture: ComponentFixture<JugadoresList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadoresList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadoresList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
