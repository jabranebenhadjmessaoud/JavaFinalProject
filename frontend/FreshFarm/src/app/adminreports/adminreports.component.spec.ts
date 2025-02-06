import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminreportsComponent } from './adminreports.component';

describe('AdminreportsComponent', () => {
  let component: AdminreportsComponent;
  let fixture: ComponentFixture<AdminreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminreportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
