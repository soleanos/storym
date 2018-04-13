import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Slice } from '../../../model/Slice';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { Choice } from '../../../model/Choice';
import { ChoiceCreationDialogComponent } from '../choice-creation-dialog/choice-creation-dialog.component';

@Component({
  selector: 'app-slice-editor-dialog',
  templateUrl: './slice-editor-dialog.component.html',
  styleUrls: ['./slice-editor-dialog.component.css']
})
export class SliceEditorDialogComponent implements OnInit {
  title: string;
  text: string;
  visible = true;
  selectable = true;
  removable =  true;
  addOnBlur = true;
  choices: Choice[];

  /* // Valeurs possibles de la toolbar

  ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
  ["fontName", "fontSize", "color"],
  ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
  ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
  ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
  ["link", "unlink", "image"] */

  editorConfig = {
    'editable': true,
    'spellcheck': true,
    'height': '200px',
    'minHeight': '0',
    'width': 'auto',
    'minWidth': '0',
    'translate': 'yes',
    'enableToolbar': true,
    'showToolbar': true,
    'placeholder': 'Saisissez votre texte ici',
    'imageEndPoint': 'https://firebasestorage.googleapis.com/v0/b/storym-application.appspot.com/o?name=profilPicture/',
    'toolbar': [
        ['bold', 'italic', 'underline', 'strikeThrough', 'image'],
        ['fontName', 'fontSize', 'color'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
        ['removeFormat', 'undo', 'redo'],
        ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList']
    ]
  };

  remove(choice: Choice): void {
    const index = this.choices.indexOf(choice);

    if (index >= 0) {
      this.choices.splice(index, 1);
    }
  }

  constructor(
    public dialog: MatDialog, public dialogRef: MatDialogRef<SliceEditorDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Slice
   ) {
     this.choices = this.data.choices;
    }

  ngOnInit() {
  }

 /**
   * Ouverture de la fenpetre modale avec paramètres
   * et gestion des actions après sa fermeture
   */
  openP(): void {
    const dialogRef = this.dialog.open(ChoiceCreationDialogComponent, {
      // width: '100%',
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
