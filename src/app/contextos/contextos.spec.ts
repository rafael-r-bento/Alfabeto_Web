import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contextos } from './contextos';

describe('Contextos', () => {
  let component: Contextos;
  let fixture: ComponentFixture<Contextos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contextos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contextos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
