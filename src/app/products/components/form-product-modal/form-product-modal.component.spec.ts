import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductModalComponent } from './form-product-modal.component';

describe('FormProductModalComponent', () => {
  let component: FormProductModalComponent;
  let fixture: ComponentFixture<FormProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProductModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
