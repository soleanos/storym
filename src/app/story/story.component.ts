import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../story';
import {StoryService} from '../story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  @Input() story: Story;
  @Input() stories: Story[];

  constructor(private storyService: StoryService) { }

  ngOnInit() {
  }

  delete(story: Story): void {
    console.log(this.stories);
    this.stories = this.stories.filter(h => h !== story);
    this.storyService.deleteStory(story).subscribe();
    console.log(this.stories);
  }
}
