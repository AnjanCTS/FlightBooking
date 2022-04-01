import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightUpdateDialogueComponent } from './flight-update-dialogue.component';

describe('FlightUpdateDialogueComponent', () => {
  let component: FlightUpdateDialogueComponent;
  let fixture: ComponentFixture<FlightUpdateDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightUpdateDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightUpdateDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
