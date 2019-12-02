import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSecPrivComponent } from './show-sec-priv.component';

describe('ShowSecPrivComponent', () => {
  let component: ShowSecPrivComponent;
  let fixture: ComponentFixture<ShowSecPrivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSecPrivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSecPrivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
