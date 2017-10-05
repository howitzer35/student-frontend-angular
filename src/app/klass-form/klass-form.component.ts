import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-klass-form',
  templateUrl: './klass-form.component.html',
  styleUrls: ['./klass-form.component.css']
})
export class KlassFormComponent implements OnInit {

  klassForm: NgForm;
  @ViewChild('klassForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  currentKlass: any;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("klass", +params['id']))
      .subscribe(klass => this.currentKlass = klass);
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

  saveKlass(klass: NgForm){
    if(typeof klass.value.klass_id === "number"){
      this.dataService.editRecord("klass", klass.value, klass.value.klass_id)
          .subscribe(
            klass => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("klass", klass.value)
          .subscribe(
            klass => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.currentKlass = {};
    }

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.klassForm = this.currentForm;
    this.klassForm.valueChanges
      .subscribe(
        data => this.onValueChanged()
      );
  }

  onValueChanged() {
    let form = this.klassForm.form;

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
    'instructor': '',
    'subject': '',
    'course': '',
  };

  validationMessages = {
    'instructor': {
      'maxlength': 'Instructor cannot be more than 30 characters long.',
    },
    'subject': {
      'required': 'Subject name is required.',
    },
    'course': {
    }
  };

}
