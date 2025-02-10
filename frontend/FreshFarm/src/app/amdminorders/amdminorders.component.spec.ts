import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmdminordersComponent } from './amdminorders.component';

describe('AmdminordersComponent', () => {
  let component: AmdminordersComponent;
  let fixture: ComponentFixture<AmdminordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmdminordersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmdminordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
