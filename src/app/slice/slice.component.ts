import { Component, OnInit, Input } from '@angular/core';
import { Slice } from '../Slice';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-slice',
  templateUrl: './slice.component.html',
  styleUrls: ['./slice.component.css']
})
export class SliceComponent implements OnInit {

  @Input() slice: Slice;
  constructor() { }

  ngOnInit() {
  }

  test(): void {
   alert("omg");
  }

}
