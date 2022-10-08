import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentsPanelComponent } from './treatments-panel.component';

describe('TreatmentsPanelComponent', () => {
  let component: TreatmentsPanelComponent;
  let fixture: ComponentFixture<TreatmentsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentsPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatmentsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
