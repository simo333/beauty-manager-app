import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentInfoComponent } from './treatment-info.component';

describe('TreatmentDetailsComponent', () => {
  let component: TreatmentInfoComponent;
  let fixture: ComponentFixture<TreatmentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
