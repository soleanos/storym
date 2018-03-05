import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../story';
import {StoryService} from '../story.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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

  ngOnInit() {
    this.getStories();
  }

}
