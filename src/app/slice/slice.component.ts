import { Component, OnInit, Input, Inject, Output, EventEmitter, ChangeDetectionStrategy, } from '@angular/core';
import { Slice } from '../Slice';
import { ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SliceEditorComponent} from '../slice-editor/slice-editor.component';
import {SliceService} from '../slice.service';
import { Choice } from '../Choice';

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
  story: number;
  id: number;
  level: number;
  rank: number;
  choices: Choice[];

  linkedSlicesUnformated: String[];
  sliceStringArray: String[];
  @Input() slice: Slice;

  @Input() slices: Slice[];
  @Output() slicesChange = new EventEmitter<Slice[]>();

  constructor(public dialog: MatDialog, private sliceService: SliceService) { }

  ngOnInit() {
    this.text = this.slice.text;
    this.title = this.slice.title;
    this.id = this.slice.id;
    this.story = this.slice.story;
    this.level = this.slice.level;
    this.rank = this.slice.rank;
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
  createSlice(title: String): void {
    title = title.trim();
    if (!title) { return; }
    this.sliceService.addSlice({title, story: this.story, text : 'Double cliquez pour éditer', level : this.level + 1, choices: new Array<Choice>()} as Slice)
      .subscribe(slice => {
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
         this.createSlice(this.sliceStringArray[1]);
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
        this.createSlice(choice.title);
      });
  }


  /**
   * Met a jour le rank
   */
  updateRank() {
    this.calculRank(this.slice.level);
    this.updateSlice(this.slice);
  }

  /**
   * Calcul le rank en fonction du nombre de passage au niveau
   * @param sliceLevel
   */
  calculRank(sliceLevel: number) {
    this.sliceService.searchSlicesByRank(sliceLevel)
      .subscribe(slices => {
        this.rank = slices.length + 1;
      });
  }
}

