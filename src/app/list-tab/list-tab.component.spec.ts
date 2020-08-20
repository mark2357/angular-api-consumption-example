import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTabComponent } from './list-tab.component';

describe('ListTabComponent', () => {
  let component: ListTabComponent;
  let fixture: ComponentFixture<ListTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
