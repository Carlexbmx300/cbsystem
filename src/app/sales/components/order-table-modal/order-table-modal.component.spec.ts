import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTableModalComponent } from './order-table-modal.component';

describe('OrderTableModalComponent', () => {
  let component: OrderTableModalComponent;
  let fixture: ComponentFixture<OrderTableModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTableModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
