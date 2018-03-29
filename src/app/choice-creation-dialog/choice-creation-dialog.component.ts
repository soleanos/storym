import {Component, Inject, OnInit, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Choice } from '../model/Choice';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';
import {SliceService} from '../slice.service';
import { Slice } from '../model/Slice';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';


@Component({
  selector: 'app-choice-creation-dialog',
  templateUrl: './choice-creation-dialog.component.html',
  styleUrls: ['./choice-creation-dialog.component.css']
})
export class ChoiceCreationDialogComponent implements OnInit {
  sliceCtrl: FormControl;
  filteredSlices: Observable<any[]>;
  choice: Choice;
  slices: Slice[];
  idStory: string;

  constructor(
    private sliceService: SliceService, public dialogRef: MatDialogRef<ChoiceCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Choice, private db: AngularFirestore
  ) {
    this.sliceCtrl = new FormControl();
    this.data.nextSliceId = this.db.createId();
   }

  ngOnInit() {
    this.slices = new Array<Slice>();
    this.getSlices(this.idStory);
    this.filteredSlices = this.sliceCtrl.valueChanges
      .pipe(
        startWith(''),
        map(slice => slice ? this.filterSlices(slice) : this.slices.slice())
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  filterSlices(title: string) {
    return this.slices.filter(slice =>
      slice.title.toLowerCase().indexOf(title.toLowerCase()) === 0);
  }

  getSlices(id: string): void {
    this.sliceService.getSlicesOfStory(id)
      .subscribe(slices => this.slices = slices);
  }


}
