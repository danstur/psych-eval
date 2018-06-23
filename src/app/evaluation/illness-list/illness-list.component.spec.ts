import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllnessListComponent } from './illness-list.component';

describe('IllnessListComponent', () => {
  let component: IllnessListComponent;
  let fixture: ComponentFixture<IllnessListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllnessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllnessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
