import { Component, OnInit, Input , Output, EventEmitter, ViewChild} from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../../services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {HomeHeaderComponent} from '../sub/home-header/home-header.component';
import {StoryCreationDialogComponent} from '../sub/story-creation-dialog/story-creation-dialog.component';

import {StoryService} from '../../services/story.service';
import { AuthService } from '../../services/auth.service';

import { Story } from '../../model/Story';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() stories: Story[];


  constructor(private storyService: StoryService, authservice: AuthService, userservice: UserService, private af: AngularFireAuth) {
    authservice.getAuth().subscribe(story => userservice.setUserAccount(af.auth.currentUser));
  }

  getStories(): void {
    this.storyService.getStories()
    .subscribe(stories => this.stories = stories);
  }

  ngOnInit() {
    this.getStories();
  }

}
