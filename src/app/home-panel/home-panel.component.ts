import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Story } from '../story';
import {StoryCreationDialogComponent} from '../story-creation-dialog/story-creation-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {StoryService} from '../story.service';

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.css']
})
export class HomePanelComponent implements OnInit {
  story: Story;
  title: string;
  @Input() stories: Story[];
  @Output() storiesChange = new EventEmitter<Story[]>();

  constructor(public dialog: MatDialog, private storyService: StoryService) { }

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
    if (!title) { return; }
    this.storyService.addStory({ title } as Story)
      .subscribe(story => {
        this.stories.push(story);
        this.storiesChange.emit(this.stories);
      });
  }

}
