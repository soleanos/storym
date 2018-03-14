import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { Slice } from '../Slice';
import { ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SliceEditorComponent} from '../slice-editor/slice-editor.component';
import {SliceService} from '../slice.service';

@Component({
  selector: 'app-slice',
  templateUrl: './slice.component.html',
  styleUrls: ['./slice.component.css']
})
export class SliceComponent implements OnInit {
  title: string;
  text: string;
  linkedSlicesUnformated: String[];
  sliceStringArray: String[];
  @Input() slice: Slice;
  @Input() slices: Slice[];
  @Output() slicesChange = new EventEmitter<Slice[]>();

  constructor(public dialog: MatDialog, private sliceService: SliceService) { }

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
        this.linkedSlicesUnformated =  slice.text.match(/(\[([^\]]|\]\[)*\])/g);
        if (this.linkedSlicesUnformated) {
          this.linkedSlicesUnformated.forEach(element => {
            // On enleve les crochets
            element = element.substr(1, element.length - 2);
            // Si on a un pipe alors on coupe en deux
            if (element.search(/[|]/g) !== -1) {
              element.replace(/[\[]|[\]]/, '');
              this.sliceStringArray = element.split('|');
              this.sliceStringArray.forEach(sliceElement => {
                sliceElement.trim();
              });
             // this.createSlice(this.sliceStringArray[1]);
            }
          });


        }
      }
    });
  }

  createSlice(title: String): void {
    title = title.trim();
    if (!title) { return; }
    this.sliceService.addSlice({ title } as Slice)
      .subscribe(slice => {
        this.slices.push(slice);
        this.slicesChange.emit(this.slices);
      });
  }

}
