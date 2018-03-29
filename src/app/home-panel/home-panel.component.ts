import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Story } from '../story';
import {StoryCreationDialogComponent} from '../story-creation-dialog/story-creation-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {StoryService} from '../story.service';
import {SliceService} from '../slice.service';
import { Slice } from '../Slice';

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

  constructor(public dialog: MatDialog, private storyService: StoryService, private sliceService: SliceService) {
    this.story = new Story();
   }

  ngOnInit() {
  }

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

  createStory(title: string): void {
    title = title.trim();
    console.log(title);
    if (!title) { return; }
    this.storyService.addStory({ title } as Story)
      .subscribe(story => {
        console.log(story.id);
        this.storiesChange.emit(this.stories);
        this.createSlice(story.id);
      });
  }

  /**
   * Crée un nouveau passage et l'ajoute à la liste des passages
   * @param title
   *
   */
  createSlice(idStory: string): void {
    this.sliceService.addSlice(
      { level : 0, title: 'Début', text: 'Double-cliquer pour éditer ce passage', story: idStory}
    ).subscribe(newSlice => {
      console.log("nouveau chapitre " + newSlice.id);
    });
  }

}
