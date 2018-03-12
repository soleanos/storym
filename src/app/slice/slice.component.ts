import { Component, OnInit, Input, Inject } from '@angular/core';
import { Slice } from '../Slice';
import { ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SliceEditorComponent} from '../slice-editor/slice-editor.component';

@Component({
  selector: 'app-slice',
  templateUrl: './slice.component.html',
  styleUrls: ['./slice.component.css']
})
export class SliceComponent implements OnInit {
  title: string;
  @Input() slice: Slice;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  test(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SliceEditorComponent, {
      width: '60%',
      data: {title : this.title}
    });

    dialogRef.afterClosed().subscribe(StoryTitle => {
      if ( StoryTitle) {
        // this.createSlice(StoryTitle);
      }
    });
  }


}
