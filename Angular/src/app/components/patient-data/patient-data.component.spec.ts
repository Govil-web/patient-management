import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDataComponent } from './patient-data.component';

describe('PatientDataComponent', () => {
  let component: PatientDataComponent;
  let fixture: ComponentFixture<PatientDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientDataComponent]
    });
    fixture = TestBed.createComponent(PatientDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
