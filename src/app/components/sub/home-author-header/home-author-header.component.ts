import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {StoryCreationDialogComponent} from '../story-creation-dialog/story-creation-dialog.component';

import {StoryService} from '../../../services/story.service';
import {SliceService} from '../../../services/slice.service';
import { AuthService } from '../../../services/auth.service';
import { CategoryService } from '../../../services/category.service';

import { Slice } from '../../../model/Slice';
import {Story } from '../../../model/Story';
import {Category } from '../../../model/Category';

@Component({
  selector: 'app-author-home-header',
  templateUrl: './home-author-header.component.html',
  styleUrls: ['./home-author-header.component.css']
})
export class HomeAuthorHeaderComponent implements OnInit {
  story: Story;
  slice: Slice;
  title: string;
  categories: Array<Category>
  @Input() user: firebase.User;
  @Input() stories: Story[];
  @Output() storiesChange = new EventEmitter<Story[]>();

  constructor(
    private router: Router,
    public dialog: MatDialog, 
    private storyService: StoryService, 
    private sliceService: SliceService, 
    private db: AngularFirestore, 
    private authService: AuthService, 
    private categoryService: CategoryService
  ) {
    this.story = new Story();
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
    .subscribe(categories => this.categories = categories);
  }


  /**
   * Ouvre la popup de création d'histoire
   */
  openDialog(): void {
    console.log(this.categories)
    const dialogRef = this.dialog.open(StoryCreationDialogComponent, {
      width: '300px',
      data: {categories : this.categories}
    });

    dialogRef.afterClosed().subscribe(data => {
      if ( data.title) {
        this.createStory(data);
      }
    });
  }

  /**
   * Crée une nouvelle histoire, avec chapitre racine
   * @param title
   */
  createStory(data: any): void {
    const title = data.title.trim();
    const date = moment().format('L');
    if (!title) { return; }
    this.storyService.addStory({ title,
      // cover : 'http://thecatapi.com/api/images/get?format=src&type=gif',
      cover :
      'https://firebasestorage.googleapis.com/v0/b/' +
      'storym-application.appspot.com/o/appliPictures%2FF100010157.jpg?alt=media&token=071e17e8-d2b2-4408-85fe-ceea264592b5',
      author: this.user.uid,
      category:data.categorySelected,
      authorPicture : this.user.photoURL,
      authorName : this.user.displayName,
      creationDate: date,
      status : 1} as Story).subscribe(story => {
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

  goToHome()  {
    this.router.navigateByUrl('/home');
  }

  disconnect = function () {
    this.authService.signOut();
  };

}
