import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consumos } from './consumos';

describe('Consumos', () => {
  let component: Consumos;
  let fixture: ComponentFixture<Consumos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consumos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Consumos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
