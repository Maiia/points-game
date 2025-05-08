import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceAreaComponent } from './dice-area.component';

describe('DiceAreaComponent', () => {
  let component: DiceAreaComponent;
  let fixture: ComponentFixture<DiceAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
