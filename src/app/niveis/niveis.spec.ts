import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Niveis } from './niveis';

describe('Niveis', () => {
  let component: Niveis;
  let fixture: ComponentFixture<Niveis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Niveis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Niveis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
