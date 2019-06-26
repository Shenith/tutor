import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrGeneraterComponent } from './qr-generater.component';

describe('QrGeneraterComponent', () => {
  let component: QrGeneraterComponent;
  let fixture: ComponentFixture<QrGeneraterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrGeneraterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrGeneraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
