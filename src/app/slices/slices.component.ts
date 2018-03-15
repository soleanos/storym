import { Component, OnInit, Input } from '@angular/core';
import { Slice } from '../Slice';

@Component({
  selector: 'app-slices',
  templateUrl: './slices.component.html',
  styleUrls: ['./slices.component.css']
})
export class SlicesComponent implements OnInit {

  @Input() slices: Slice[];
  
  constructor() { }

  ngOnInit() {
  }

}
