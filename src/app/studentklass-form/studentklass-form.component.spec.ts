import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentklassFormComponent } from './studentklass-form.component';

describe('StudentklassFormComponent', () => {
  let component: StudentklassFormComponent;
  let fixture: ComponentFixture<StudentklassFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentklassFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentklassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
