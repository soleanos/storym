import { Component, OnInit } from '@angular/core';
import { Story } from '../story';
import {StoryCreationDialogComponent} from '../story-creation-dialog/story-creation-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-stories-panel',
  templateUrl: './stories-panel.component.html',
  styleUrls: ['./stories-panel.component.css']
})
export class StoriesPanelComponent implements OnInit {
  story: Story;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StoryCreationDialogComponent, {
      width: '250px'
    });

  dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.story.title = result;
    });
  }

}
