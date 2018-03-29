import { Component, OnInit, Input, Inject, Output, EventEmitter, ChangeDetectionStrategy, } from '@angular/core';
import { Slice } from '../Slice';
import { ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SliceEditorComponent} from '../slice-editor/slice-editor.component';
import {SliceService} from '../slice.service';
import { Choice } from '../Choice';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

@Component({
  selector: 'app-slice',
  templateUrl: './slice.component.html',
  styleUrls: ['./slice.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * Classe liée à l'élément passage.
 */
export class SliceComponent implements OnInit {
  title: string;
  text: string;
  story: string;
  id: string;
  level: number;
  rank: number;
  choices: Choice[];

  linkedSlicesUnformated: String[];
  sliceStringArray: string[];
  @Input() slice: Slice;

  @Input() slices: Slice[];
  @Output() slicesChange = new EventEmitter<Slice[]>();

  constructor(public dialog: MatDialog, private sliceService: SliceService, private db: AngularFirestore) { }

  ngOnInit() {
    this.text = this.slice.text;
    this.title = this.slice.title;
    this.id = this.slice.id;
    this.story = this.slice.story;
    this.level = this.slice.level;
    this.rank = this.slice.rank;
    this.choices = this.slice.choices;
    // this.getChoiceCollection(this.slice.id);
  }

  getChoiceCollection(id: string): void {
    this.sliceService.getChoicesOfSlice(id)
      .subscribe(choices => this.choices = choices);
  }

  /**
   * Ouverture de la fenpetre modale avec paramètres
   * et gestion des actions après sa fermeture
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(SliceEditorComponent, {
      width: '100%',
      data: {title : this.title, text : this.text, id : this.id, story : this.story, level : this.level,choices:this.choices}
    });

    dialogRef.afterClosed().subscribe(slice => {
      if (slice) {
        this.updateSlice(slice);
        this.createNextSlicesFromChoices(slice);
      }
    });
  }

  /**
   * Crée un nouveau passage et l'ajoute à la liste des passages 
   * @param title
   *
   */
  createSlice(title: string, sliceId: string): void {
    title = title.trim();
    if (!title) { return; }
    this.sliceService.addSlice({id : sliceId, title, story: this.story,
       text : 'Double cliquez pour éditer', level : this.level + 1,
        choices: new Array<Choice>()} as Slice).subscribe(slice => {
        this.slices.push(slice);
        this.slicesChange.emit(this.slices);
      });
  }

  /**
   * Met à jour le passage
   * @param slice 
   */
  updateSlice(slice: Slice): void {
    if (slice) {
    this.sliceService.updateSlice(slice)
      .subscribe(sliceUpdated => {
        this.slice = slice;
      });
    }
  }

  /**
   * Crée un passage pour chaque pattern [x | y] trouvé dans le texte
   * avec pour titre y
   * @param sliceText
   */
  createNextSlicesFromText(sliceText: String) {
    this.linkedSlicesUnformated =  sliceText.match(/(\[([^\]]|\]\[)*\])/g);
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
          const sliceId = this.db.createId();
         this.createSlice(this.sliceStringArray[1], sliceId);
        }
      });
    }
  }

 /**
   * Crée un passage pour chaque choix sur passage.
   * avec pour titre y
   * @param choices
   */
  createNextSlicesFromChoices(choices: Choice[]) {
      this.choices.forEach(choice => {
        // TODO chercher si le choix existe deja
        console.log(this.slices);
        this.createSlice(choice.nextSliceTitle, choice.nextSliceId);
      });
  }

}

