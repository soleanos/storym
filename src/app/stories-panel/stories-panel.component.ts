import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../story';
import {StoryCreationDialogComponent} from '../story-creation-dialog/story-creation-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {StoryService} from '../story.service';

@Component({
  selector: 'app-stories-panel',
  templateUrl: './stories-panel.component.html',
  styleUrls: ['./stories-panel.component.css']
})
export class StoriesPanelComponent implements OnInit {
  story: Story;
  title: string;
  @Input() stories: Story[];

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
      });
  }

}
