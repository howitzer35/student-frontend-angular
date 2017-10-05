import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentklassComponent } from './studentklass.component';

describe('StudentklassComponent', () => {
  let component: StudentklassComponent;
  let fixture: ComponentFixture<StudentklassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentklassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentklassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
