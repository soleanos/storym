import { Component, OnInit, Input , Output, EventEmitter, ViewChild} from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../../services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {HomeHeaderComponent} from '../sub/home-header/home-header.component';
import {StoryCreationDialogComponent} from '../sub/story-creation-dialog/story-creation-dialog.component';
import * as firebase from 'firebase/app';
import {StoryService} from '../../services/story.service';
import { AuthService } from '../../services/auth.service';

import { Story } from '../../model/Story';

@Component({
  selector: 'app-home-author',
  templateUrl: './home-author.component.html',
  styleUrls: ['./home-author.component.css']
})

export class HomeAuthorComponent implements OnInit {
  @Input() stories: Story[];
  user: firebase.User;

  constructor(private storyService: StoryService, authservice: AuthService, private userService: UserService, private af: AngularFireAuth) {
    authservice.getAuth().subscribe(user => this.actionsAfterGettingUser(user));
  }

  actionsAfterGettingUser(user: firebase.User) {
    // this.userService.setUserAccount(user);
    this.user = user;
  }

  // getStories(): void {
  //   this.storyService.getStories()
  //   .subscribe(stories => this.stories = stories);
  // }

  getStories(): void {
    this.storyService.getStoriesOfAuthor(this.user.uid)
    .subscribe(stories => this.stories = stories);
  }

  ngOnInit() {
    this.getStories();
  }

}
