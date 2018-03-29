import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Story } from '../model/Story';
import {StoryCreationDialogComponent} from '../story-creation-dialog/story-creation-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {StoryService} from '../story.service';
import {SliceService} from '../slice.service';
import { Slice } from '../model/Slice';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.css']
})
export class HomePanelComponent implements OnInit {
  story: Story;
  slice: Slice;
  title: string;
  @Input() stories: Story[];
  @Output() storiesChange = new EventEmitter<Story[]>();

  constructor(public dialog: MatDialog, private storyService: StoryService, private sliceService: SliceService
    , private db: AngularFirestore) {
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
    this.storyService.addStory({ title } as Story)
      .subscribe(story => {
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

}
