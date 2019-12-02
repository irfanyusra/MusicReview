import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDcmaTakedownComponent } from './show-dcma-takedown.component';

describe('ShowDcmaTakedownComponent', () => {
  let component: ShowDcmaTakedownComponent;
  let fixture: ComponentFixture<ShowDcmaTakedownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDcmaTakedownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDcmaTakedownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
