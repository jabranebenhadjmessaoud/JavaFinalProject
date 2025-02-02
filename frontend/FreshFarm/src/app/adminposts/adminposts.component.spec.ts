import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpostsComponent } from './adminposts.component';

describe('AdminpostsComponent', () => {
  let component: AdminpostsComponent;
  let fixture: ComponentFixture<AdminpostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminpostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
