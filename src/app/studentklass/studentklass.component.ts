import { Component, OnInit,Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

@Component({
  selector: 'app-studentklass',
  templateUrl: './studentklass.component.html',
  styleUrls: ['./studentklass.component.css']
})
export class StudentklassComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  students: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  ngOnInit() { this.getStudents(); }
 
  getStudents() {
    this.dataService.getRecords("studentklass")
      .subscribe(
        students => {
          this.students = students
          console.log(this.students)
        },
        error =>  this.errorMessage = <any>error);
  }

  // deleteStudentklass(id:number) {

  //   let dialogRef = this.dialog.open(DeleteConfirmComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result){
  //       this.dataService.deleteRecord("studentklass", id)
  //         .subscribe(
  //           studentklass => {
  //             this.successMessage = "Record(s) deleted succesfully"; 
  //             this.getStudents(); 
  //           },
  //           error => this.errorMessage = <any>error);
  //     }
  //   });
  // }


  deleteStudent(id:number) {
    
        let dialogRef = this.dialog.open(DeleteConfirmComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.dataService.deleteRecord("studentklass", id)
              .subscribe(
                student => {this.successMessage = "Record(s) deleted succesfully"; this.getStudents(); },
                error =>  this.errorMessage = <any>error);
          }
        });
      }
}
