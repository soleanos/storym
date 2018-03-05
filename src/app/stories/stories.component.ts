import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../story';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  @Input() stories: Story[];

  constructor() { }

  ngOnInit() {
  }

}
