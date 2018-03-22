import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Choice } from '../Choice';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-slice-creation-dialog',
  templateUrl: './slice-creation-dialog.component.html',
  styleUrls: ['./slice-creation-dialog.component.css']
})
export class SliceCreationDialogComponent implements OnInit {
  choiceCtrl: FormControl;
  filteredChoices: Observable<any[]>;
  choice : Choice;
  constructor(
    public dialogRef: MatDialogRef<SliceCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Choice
  ) {
    this.choiceCtrl = new FormControl();
    this.filteredChoices = this.choiceCtrl.valueChanges
      .pipe(
        startWith(''),
        map(choice => choice ? this.filterChoices(choice) : this.choices.slice())
      );
   }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  choices: Choice[] = [
    {
      title: 'Arkansas',
      text : 'pipou'
    },
    {
      title: 'Lnsdqs',
      text : 'zzz'
    },
    {
      title: 'eeee',
      text : 'rrr'
    },
    {
      title: 'eeee',
      text : 'rrr'
    },
    {
      title: 'eezze',
      text : 'rrr'
    },
  ];

  filterChoices(title: string) {
    return this.choices.filter(choice =>
      choice.title.toLowerCase().indexOf(title.toLowerCase()) === 0);
  }

}
