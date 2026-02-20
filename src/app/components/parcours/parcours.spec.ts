import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Parcours } from './parcours';

describe('Parcours', () => {
  let component: Parcours;
  let fixture: ComponentFixture<Parcours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Parcours]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Parcours);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
