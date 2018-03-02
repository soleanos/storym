import { Component, OnInit } from '@angular/core';
import { Story } from '../story';
import { STORIES } from '../mock-stories';
import {StoryService} from '../story.service';



@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  story: Story = {
    id: 1,
    title: 'Windstorm'
  };

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

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.storyService.addStory({ title } as Story)
      .subscribe(story => {
        this.stories.push(story);
      });
  }

  delete(story: Story): void {
    this.stories = this.stories.filter(h => h !== story);
    this.storyService.deleteStory(story).subscribe();
  }

  ngOnInit() {
    this.getStories();
  }

}
