import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Veille } from './veille';

describe('Veille', () => {
  let component: Veille;
  let fixture: ComponentFixture<Veille>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Veille]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Veille);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
