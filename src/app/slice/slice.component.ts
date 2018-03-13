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
  text: string;
  results : String[];
  @Input() slice: Slice;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.text = this.slice.text;
    this.title = this.slice.title;
  }

  test(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SliceEditorComponent, {
      width: '60%',
      data: {title : this.title, text : this.text}
    });

    dialogRef.afterClosed().subscribe(slice => {
      if ( slice) {
        this.results =  slice.text.match(/#puis#/);
        console.log(slice.text.match(/(\[([^\]]|\]\[)*\])/g));
        //({([^}]|}{)*})
      }
    });
  }


}
