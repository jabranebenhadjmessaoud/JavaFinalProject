import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerformComponent } from './farmerform.component';

describe('FarmerformComponent', () => {
  let component: FarmerformComponent;
  let fixture: ComponentFixture<FarmerformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
