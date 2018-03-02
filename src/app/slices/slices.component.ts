import { Component, OnInit, Input } from '@angular/core';
import { Slice } from '../Slice';

@Component({
  selector: 'app-slices',
  templateUrl: './slices.component.html',
  styleUrls: ['./slices.component.css']
})
export class SlicesComponent implements OnInit {

  @Input() slices: Slice[];

  // @ViewChild('myCanvas') myCanvas: ElementRef;
  // public context: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
  }

}
