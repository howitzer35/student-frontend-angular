import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-majorklass-form',
  templateUrl: './majorklass-form.component.html',
  styleUrls: ['./majorklass-form.component.css']
})
export class MajorklassFormComponent implements OnInit {

  majorklassForm: NgForm;
  @ViewChild('majorKlassForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  majorklass: any;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("majorklass", +params['id']))
      .subscribe(major => this.majorklass = major);
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

  saveMajor(major: NgForm){
    if(typeof major.value.majorklass_id === "number"){
      this.dataService.editRecord("majorklass", major.value, major.value.majorklass_id)
          .subscribe(
            major => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("majorklass", major.value)
          .subscribe(
            major => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.majorklass = {};
    }
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.majorklassForm = this.currentForm;
    this.majorklassForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.majorklassForm.form;

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
    'major_id': '',
    'klass_id': '',
  };

  validationMessages = {
    'major_id': {
      'required': 'Major ID name is required.',
      'maxlength': 'Major ID name cannot be more than 30 characters long.',
      'type': 'Class ID must be a number.'      
    },
    'klass_id': {
      'required': 'Major ID name is required.',      
      'maxlength': 'Class ID cannot be more than 30 characters long.',
      'type': 'Class ID must be a number.'
    }
  };

}
