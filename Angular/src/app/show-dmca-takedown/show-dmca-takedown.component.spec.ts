import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDmcaTakedownComponent } from './show-dmca-takedown.component';

describe('ShowDmcaTakedownComponent', () => {
  let component: ShowDmcaTakedownComponent;
  let fixture: ComponentFixture<ShowDmcaTakedownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDmcaTakedownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDmcaTakedownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
