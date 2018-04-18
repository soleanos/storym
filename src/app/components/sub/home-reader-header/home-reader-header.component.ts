import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

import {StoryCreationDialogComponent} from '../story-creation-dialog/story-creation-dialog.component';

import {StoryService} from '../../../services/story.service';
import {SliceService} from '../../../services/slice.service';
import { AuthService } from '../../../services/auth.service';

import { Slice } from '../../../model/Slice';
import {Story } from '../../../model/Story';

@Component({
  selector: 'app-reader-home-header',
  templateUrl: './home-reader-header.component.html',
  styleUrls: ['./home-reader-header.component.css']
})
export class HomeReaderHeaderComponent implements OnInit {
  story: Story;
  slice: Slice;
  title: string;
  @Input() user: firebase.User;
  @Input() stories: Story[];
  @Output() storiesChange = new EventEmitter<Story[]>();

  constructor(private router: Router, public dialog: MatDialog, private storyService: StoryService, private sliceService: SliceService
    , private db: AngularFirestore, private authService: AuthService
  ) {
    this.story = new Story();
  }

  ngOnInit() {
  }

  goToHome = function () {
    this.router.navigateByUrl('/home');
  };

  manageAccount()  {
    this.router.navigateByUrl('/account');
  }

  disconnect = function () {
    this.authService.signOut();
  };

}
