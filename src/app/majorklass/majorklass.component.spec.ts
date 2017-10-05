import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorklassComponent } from './majorklass.component';

describe('MajorklassComponent', () => {
  let component: MajorklassComponent;
  let fixture: ComponentFixture<MajorklassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorklassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorklassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
