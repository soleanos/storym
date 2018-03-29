import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


import { Story } from '../model/Story';
@Component({
  selector: 'app-story-creation-dialog',
  templateUrl: './story-creation-dialog.component.html',
  styleUrls: ['./story-creation-dialog.component.css']
})
export class StoryCreationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StoryCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Story
  ) {
    data.title = '';
   }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
