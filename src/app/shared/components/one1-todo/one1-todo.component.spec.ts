import { ComponentFixture, TestBed } from '@angular/core/testing';

import { One1TodoComponent } from './one1-todo.component';

describe('One1TodoComponent', () => {
  let component: One1TodoComponent;
  let fixture: ComponentFixture<One1TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ One1TodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(One1TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
