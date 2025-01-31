import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunityformComponent } from './comunityform.component';

describe('ComunityformComponent', () => {
  let component: ComunityformComponent;
  let fixture: ComponentFixture<ComunityformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunityformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunityformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
