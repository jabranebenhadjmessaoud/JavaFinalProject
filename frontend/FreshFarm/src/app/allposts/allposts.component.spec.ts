import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllpostsComponent } from './allposts.component';

describe('AllpostsComponent', () => {
  let component: AllpostsComponent;
  let fixture: ComponentFixture<AllpostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllpostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
