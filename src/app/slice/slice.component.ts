import { Component, OnInit, Input, Inject, Output, EventEmitter, ChangeDetectionStrategy, } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

import {SliceService} from '../services/slice.service';
import {SliceEditorComponent} from '../slice-editor/slice-editor.component';

import { Choice } from '../model/Choice';
import { Slice } from '../model/Slice';

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
    this.choices = this.slice.choices;
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

      // Contrôle des choix du passage.
      slice.choices.forEach(choice => {
        const existingSlice = this.isSliceAlreadyExisting(choice.nextSliceTitle);
        console.log(existingSlice);
        if (existingSlice && existingSlice.level === 0) {
          // Si jamais on souhaite interdire les boucles vers le passage racine, à décommenter :
          // slice.choices = slice.choices.filter(h => h !== choice);

          // Les boucles sont autorisée pour l'instant : on change l'id du
          // prochain chapitre lié au choixà la main
          choice.nextSliceId = existingSlice.id;
          alert('Attention ! Vous avez un choix qui redirige vers le premier passage de l histoire');
        }else if (existingSlice && existingSlice.level !== 0) {
          // On supprime le choix dans le cas ou il redirige vers le même passage.
          slice.choices = slice.choices.filter(h => h !== choice);
          alert('Vous avez créer un choix lié au même chapitre ! Il a été supprimé.');
        }
      });

      // Mise à jour du passage
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

        // On ne crée pas le passage si il éxiste déja.
        if (!this.isSliceAlreadyExisting(choice.nextSliceTitle)) {
          this.createSlice(choice.nextSliceTitle, choice.nextSliceId);
        }
        // else if (existingSlice.level === 0 ) {
        //   alert("Vous ne pouvez pas ")
        //   this.choices = this.choices.filter(h => h !== choice);
        // }
      });
  }

  /**
   * Retourne le passage si il éxiste déja.
   * @param nextSlicetitle
   */
  isSliceAlreadyExisting(nextSlicetitle: string): Slice {
    return this.slices.find(slice => slice.title === nextSlicetitle);
  }

}

