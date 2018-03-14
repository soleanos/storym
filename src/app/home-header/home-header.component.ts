import { Component, OnInit, Input,Output} from '@angular/core';
import { Story } from '../story';
import {MatSidenav} from '@angular/material/sidenav';
import { viewParentEl } from '@angular/core/src/view/util';


@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  @Input() stories: Story[];
  @Input() sidenav: MatSidenav;
  @Output() sidenavChange: MatSidenav;

  constructor(

  ) { }

  ngOnInit() {
  }

}
