import { Component, OnInit, Input, Inject, Output, EventEmitter, ChangeDetectionStrategy, } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

import {SliceService} from '../../../services/slice.service';
import {SliceEditorDialogComponent} from '../slice-editor-dialog/slice-editor-dialog.component';

import { Choice } from '../../../model/Choice';
import { Slice } from '../../../model/Slice';

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
    const dialogRef = this.dialog.open(SliceEditorDialogComponent, {
      width: '100%',
      height: '70%',
      data: {title : this.title, text : this.text, id : this.id, story : this.story, level : this.level, choices: this.choices}
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

        if (existingSlice && existingSlice.id === slice.id) {
          // On supprime le choix dans le cas ou il redirige vers le même passage.
          slice.choices = slice.choices.filter(h => h !== choice);
          alert('Vous avez créer un choix lié au même chapitre ! Il va être supprimé.');
        }else if (existingSlice) {
          if (existingSlice.level === 0) {
            // On autorise les boucles vers le passage racine, mais envoie d'un message préventif.
            alert('Attention ! Vous avez un choix qui redirige vers le premier passage de l histoire');
          }
          choice.nextSliceId = existingSlice.id;
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

