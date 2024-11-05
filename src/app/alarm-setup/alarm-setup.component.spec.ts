import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmSetupComponent } from './alarm-setup.component';

describe('AlarmSetupComponent', () => {
  let component: AlarmSetupComponent;
  let fixture: ComponentFixture<AlarmSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
