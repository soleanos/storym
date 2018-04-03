import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import {StoryService} from '../../../services/story.service';

import { Story } from '../../../model/Story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  @Input() story: Story;
  @Input() stories: Story[];
  @Output() storiesChange = new EventEmitter<Story[]>();
  constructor(private storyService: StoryService,private router: Router) { }

  ngOnInit() {
  }

  edit(storyId : string) : void{
    this.router.navigateByUrl('/story/' + storyId);
  };

  delete(story: Story): void {
    this.stories = this.stories.filter(h => h !== story);
    this.storyService.deleteStory(story).subscribe();
    this.storiesChange.emit(this.stories);
  }
}