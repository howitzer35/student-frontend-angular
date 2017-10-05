import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-studentklass-form',
  templateUrl: './studentklass-form.component.html',
  styleUrls: ['./studentklass-form.component.css']
})
export class StudentklassFormComponent implements OnInit {

  studentklassForm: NgForm;
  @ViewChild('studentKlassForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  studentklass: any;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("studentklass", +params['id']))
      .subscribe(student => this.studentklass = student);
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
    if(typeof student.value.studentklass_id === "number"){
      this.dataService.editRecord("studentklass", student.value, student.value.studentklass_id)
          .subscribe(
            student => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("studentklass", student.value)
          .subscribe(
            student => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.studentklass = {};
    }
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.studentklassForm = this.currentForm;
    this.studentklassForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.studentklassForm.form;

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
    'student_id': '',
    'klass_id': ''
  };

  validationMessages = {
    'student_id': {
      'required': 'Student ID name is required.',
      'type': 'Student ID must be a number.'
    },
    'klass_id': {
      'required': 'Student ID name is required.',      
      'type': 'Class ID must be a number.'
    }
  };

}
