import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorklassFormComponent } from './majorklass-form.component';

describe('MajorklassFormComponent', () => {
  let component: MajorklassFormComponent;
  let fixture: ComponentFixture<MajorklassFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorklassFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorklassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
