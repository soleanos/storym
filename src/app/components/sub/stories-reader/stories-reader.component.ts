import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Story } from '../../../model/Story';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-stories-reader',
  templateUrl: './stories-reader.component.html',
  styleUrls: ['./stories-reader.component.css']
})
export class StoriesReaderComponent implements OnInit {

  @Input() stories: Story[];
  @Input() user: firebase.User;
  @Output() storiesChange = new EventEmitter<Story[]>();

  constructor() { }

  ngOnInit() {
  }

  changed(newValue) {
    if ( newValue) {
      this.storiesChange.emit(newValue);
    }
  }

}
