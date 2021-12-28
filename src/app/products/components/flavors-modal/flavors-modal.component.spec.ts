import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorsModalComponent } from './flavors-modal.component';

describe('FlavorsModalComponent', () => {
  let component: FlavorsModalComponent;
  let fixture: ComponentFixture<FlavorsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlavorsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
