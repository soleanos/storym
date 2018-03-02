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

  // ngAfterViewInit(): void {
  //   this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
  // }

  // drawLine(p1, p2) {
  //   var canvas = document.getElementById("connection-canvas");
  //   var ctx = canvas.getContext("2d");
  
  //   ctx.beginPath();
  //   ctx.moveTo(p1.x, p1.y);
  //   ctx.lineTo(p2.x, p2.y);
  //   ctx.stroke();
  // }

}
