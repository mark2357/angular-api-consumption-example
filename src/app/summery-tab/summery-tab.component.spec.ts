import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummeryTabComponent } from './summery-tab.component';

describe('SummeryTabComponent', () => {
  let component: SummeryTabComponent;
  let fixture: ComponentFixture<SummeryTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummeryTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummeryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
