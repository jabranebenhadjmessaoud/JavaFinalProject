import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowpostdetailsComponent } from './showpostdetails.component';

describe('ShowpostdetailsComponent', () => {
  let component: ShowpostdetailsComponent;
  let fixture: ComponentFixture<ShowpostdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowpostdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowpostdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
