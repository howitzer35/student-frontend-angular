import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { StudentComponent }   from '../student/student.component';
import { StudentFormComponent }   from '../student-form/student-form.component';

import { HomeComponent }   from '../home/home.component';

import { MajorComponent }   from '../major/major.component';
import { MajorFormComponent }   from '../major-form/major-form.component';

import { GradeComponent }   from '../grade/grade.component';
import { GradeFormComponent }   from '../grade-form/grade-form.component';

import { AssignmentComponent }   from '../assignment/assignment.component';
import { AssignmentFormComponent }   from '../assignment-form/assignment-form.component';

import { KlassComponent }   from '../klass/klass.component';
import { KlassFormComponent }   from '../klass-form/klass-form.component';

import { MajorklassComponent }   from '../majorklass/majorklass.component';
import { MajorklassFormComponent }   from '../majorklass-form/majorklass-form.component';

import { StudentklassComponent }   from '../studentklass/studentklass.component';
import { StudentklassFormComponent }   from '../studentklass-form/studentklass-form.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },

  { path: 'student',  component: StudentComponent },
  { path: 'student/edit/:id', component: StudentFormComponent },
  { path: 'student/add', component: StudentFormComponent },

  { path: 'major',  component: MajorComponent },
  { path: 'major/edit/:id', component: MajorFormComponent },
  { path: 'major/add', component: MajorFormComponent },

  { path: 'grade',  component: GradeComponent },
  { path: 'grade/edit/:id', component: GradeFormComponent },
  { path: 'grade/add', component: GradeFormComponent },

  { path: 'assignment',  component: AssignmentComponent },
  { path: 'assignment/edit/:id', component: AssignmentFormComponent },
  { path: 'assignment/add', component: AssignmentFormComponent },

  { path: 'klass',  component: KlassComponent },
  { path: 'klass/edit/:id', component: KlassFormComponent },
  { path: 'klass/add', component: KlassFormComponent },

  { path: 'majorklass',  component: MajorklassComponent },
  { path: 'majorklass/edit/:id', component: MajorklassFormComponent },
  { path: 'majorklass/add', component: MajorklassFormComponent },

  { path: 'studentklass',  component: StudentklassComponent },
  { path: 'studentklass/edit/:id', component: StudentklassFormComponent },
  { path: 'studentklass/add', component: StudentklassFormComponent },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
