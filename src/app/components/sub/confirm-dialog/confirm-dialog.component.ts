import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


import { Story } from '../../../model/Story';
@Component({
  selector: 'app-comfirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ComfirmDialogComponent implements OnInit {
  message: string;
  response: boolean;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data.message ;
   }


  ngOnInit() {
  }

  onOkClick(): void {
    this.response = true;
    this.dialogRef.close(this.response);
  }

  onNoClick(): void {
    this.response = false;
    this.dialogRef.close(this.response);
  }

}
