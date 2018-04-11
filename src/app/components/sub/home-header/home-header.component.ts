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
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
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

  /**
   * Ouvre la popup de création d'histoire
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(StoryCreationDialogComponent, {
      width: '300px',
      data: {title : this.title}
    });

    dialogRef.afterClosed().subscribe(StoryTitle => {
      if ( StoryTitle) {
        this.createStory(StoryTitle);
      }
    });
  }

  /**
   * Crée une nouvelle histoire, avec chapitre racine
   * @param title
   */
  createStory(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.storyService.addStory({ title,
      cover : 'http://thecatapi.com/api/images/get?format=src&type=gif',
      author: this.user.uid,
      published : false} as Story).subscribe(story => {
        this.storiesChange.emit(this.stories);
        const sliceId = this.db.createId();
        this.createSlice(story.id, sliceId);
      });
  }

  /**
   * Crée un nouveau passage et l'ajoute à la liste des passages
   * @param title
   *
   */
  createSlice(storyId: string, sliceId: string): void {
    this.sliceService.addSlice(
      {id: sliceId, level : 0, title: 'Début', text: 'Double-cliquer pour éditer ce passage', story: storyId, choices : []}
    );
  }

  manageAccount()  {
    this.router.navigateByUrl('/account');
  }

  disconnect = function () {
    this.authService.signOut();
  };

}
