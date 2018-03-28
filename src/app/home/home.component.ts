import { Component, OnInit, Input , Output, EventEmitter, ViewChild} from '@angular/core';
import { Story } from '../story';
import {StoryService} from '../story.service';
import {HomeHeaderComponent} from '../home-header/home-header.component';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() stories: Story[];
  selectedStory: Story;
  @ViewChild('sidenav') sidenav: MatSidenav;

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
    console.log("==========Page home============");
    this.getStories();
  }

  close() {
    this.sidenav.close();
  }

}
