import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkCardComponent } from './mark-card.component';

describe('MarkCardComponent', () => {
  let component: MarkCardComponent;
  let fixture: ComponentFixture<MarkCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
