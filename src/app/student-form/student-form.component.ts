import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  studentForm: NgForm;
  @ViewChild('studentForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  student: any;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("student", +params['id']))
      .subscribe(student => this.student = student);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  }

  saveStudent(student: NgForm){
    if(typeof student.value.student_id === "number"){
      this.dataService.editRecord("student", student.value, student.value.student_id)
          .subscribe(
            student => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("student", student.value)
          .subscribe(
            student => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.student = {};
    }

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.studentForm = this.currentForm;
    this.studentForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.studentForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'first_name': '',
    'last_name': '',
    'start_date': '',
    'gpa': '',
    'sat': '',
    'major_id': '',
  };

  validationMessages = {
    'first_name': {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 1 character long.',
    },
    'last_name': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
    },
    'start_date': {
      'required': 'Start date is required.',      
      'pattern': 'Start date should be in the following format: YYYY-MM-DD'
    },
    'gpa': {
      'required': 'GPA is required.',
      'pattern': 'GPA must be a decimal'
    },
    'sat': {
      'required': 'SAT score is required.',
      'maxlength': 'SAT score cannot be more than 4 characters long.',
      'pattern': 'SAT score must be a number.'
    },
    'major_id': {
      'required': 'Major ID is required.',      
      'pattern': 'Major ID must be a number.'
    }
  };

}
