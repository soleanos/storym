import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Slice } from '../Slice';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { Choice } from '../Choice';
import { SliceCreationDialogComponent } from '../slice-creation-dialog/slice-creation-dialog.component';

@Component({
  selector: 'app-slice-editor',
  templateUrl: './slice-editor.component.html',
  styleUrls: ['./slice-editor.component.css']
})
export class SliceEditorComponent implements OnInit {
  title: string;
  text: string;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  choices : Choice[];

  separatorKeysCodes = [ENTER, COMMA];
  fruits = [
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ];

  remove(choice: Choice): void {
    let index = this.choices.indexOf(choice);

    if (index >= 0) {
      this.choices.splice(index, 1);
    }
  }

  constructor(
    public dialog: MatDialog,public dialogRef: MatDialogRef<SliceEditorComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Slice
   ) {
     this.choices = new Array<Choice>();
    }

  ngOnInit() {
  }

  saveText(event: any) { // without type info
     console.log(event.target.value );
  }

  addSliceTag(event: any) { // without type info
    this.data.text += ' [Texte de lien | Titre unique du prochain passage]';
 }

 /**
   * Ouverture de la fenpetre modale avec paramètres
   * et gestion des actions après sa fermeture
   */
  openP(): void {
    const dialogRef = this.dialog.open(SliceCreationDialogComponent, {
      width: '25%',
      data: {title : this.title, text : this.text}
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        console.log(this.choices);
        this.choices.push(choice);
      }
    });
  }

}
