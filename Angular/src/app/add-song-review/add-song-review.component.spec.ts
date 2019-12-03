import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSongReviewComponent } from './add-song-review.component';

describe('AddSongReviewComponent', () => {
  let component: AddSongReviewComponent;
  let fixture: ComponentFixture<AddSongReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSongReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSongReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
