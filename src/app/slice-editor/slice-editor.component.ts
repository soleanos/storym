import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Slice } from '../Slice';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { Choice } from '../Choice';
import { ChoiceCreationDialogComponent } from '../choice-creation-dialog/choice-creation-dialog.component';

@Component({
  selector: 'app-slice-editor',
  templateUrl: './slice-editor.component.html',
  styleUrls: ['./slice-editor.component.css']
})
export class SliceEditorComponent implements OnInit {
  title: string;
  text: string;
  visible = true;
  selectable = true;
  removable=  true;
  addOnBlur = true;
  choices: Choice[];

  remove(choice: Choice): void {
    const index = this.choices.indexOf(choice);

    if (index >= 0) {
      this.choices.splice(index, 1);
    }
  }

  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<SliceEditorComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Slice
   ) {
     this.choices = this.data.choices;
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
    const dialogRef = this.dialog.open(ChoiceCreationDialogComponent, {
      width: '25%',
      data: {}
    });
    dialogRef.componentInstance.idStory = this.data.story;

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        console.log(this.choices);
        this.choices.push(choice);
      }
    });
  }

}
