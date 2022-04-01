import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportUpdateDialogueComponent } from './airport-update-dialogue.component';

describe('AirportUpdateDialogueComponent', () => {
  let component: AirportUpdateDialogueComponent;
  let fixture: ComponentFixture<AirportUpdateDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportUpdateDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportUpdateDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
