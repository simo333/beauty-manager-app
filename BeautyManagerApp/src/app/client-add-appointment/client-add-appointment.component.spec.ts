import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientAddAppointmentComponent} from './client-add-appointment.component';

describe('ClientAddVisitComponent', () => {
  let component: ClientAddAppointmentComponent;
  let fixture: ComponentFixture<ClientAddAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientAddAppointmentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClientAddAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
