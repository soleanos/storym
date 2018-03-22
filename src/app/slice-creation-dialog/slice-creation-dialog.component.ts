import {Component, Inject, OnInit,Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Choice } from '../Choice';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';
import {SliceService} from '../slice.service';
import { Slice } from '../Slice';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-slice-creation-dialog',
  templateUrl: './slice-creation-dialog.component.html',
  styleUrls: ['./slice-creation-dialog.component.css']
})
export class SliceCreationDialogComponent implements OnInit {
  sliceCtrl: FormControl;
  filteredSlices: Observable<any[]>;
  choice : Choice;
  slices: Slice[];
  idStory : number;
  
  constructor(
    private sliceService: SliceService, public dialogRef: MatDialogRef<SliceCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Choice
  ) {
    this.slices = new Array<Slice>();
    this.sliceCtrl = new FormControl();
    this.filteredSlices = this.sliceCtrl.valueChanges
      .pipe(
        startWith(''),
        map(slice => slice ? this.filterSlices(slice) : this.slices.slice())
      );
   }


  ngOnInit() {
    this.getSlices(this.idStory);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  filterSlices(title: string) {
    return this.slices.filter(slice =>
      slice.title.toLowerCase().indexOf(title.toLowerCase()) === 0);
  }

  getSlices(id: number): void {
    this.sliceService.searchSlices(id)
      .subscribe(slices => this.slices = slices);
  }


}
