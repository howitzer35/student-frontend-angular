import { Component, OnInit,Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

@Component({
  selector: 'app-majorklass',
  templateUrl: './majorklass.component.html',
  styleUrls: ['./majorklass.component.css']
})
export class MajorklassComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  majors: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  ngOnInit() { this.getMajors(); }
 
  getMajors() {
    this.dataService.getRecords("majorklass")
      .subscribe(
        majors => {
          this.majors = majors
          console.log(this.majors)
        },
        error =>  this.errorMessage = <any>error);
  }

  deleteMajor(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("majorklass", id)
          .subscribe(
            major => {this.successMessage = "Record(s) deleted succesfully"; this.getMajors(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
