import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../story';
import {StoryService} from '../story.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  stories: Story[];
  selectedStory: Story;

  onSelect(story: Story): void {
    this.selectedStory = story;
  }
  constructor(private storyService: StoryService) {
  }

  getStories(): void {
    this.storyService.getStories()
    .subscribe(stories => this.stories = stories);
  }

  delete(story: Story): void {
    this.stories = this.stories.filter(h => h !== story);
    this.storyService.deleteStory(story).subscribe();
  }

  ngOnInit() {
    this.getStories();
  }

}
