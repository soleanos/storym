import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../story';
import { StoryService } from '../story.service';
import { SliceService } from '../slice.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story-test',
  templateUrl: './story-test.component.html',
  styleUrls: ['./story-test.component.css']
})
export class StoryTestComponent implements OnInit {
  @Input() story: Story;

  constructor(   
    private route: ActivatedRoute,
    private storyService: StoryService,
    private location: Location,
    private sliceService: SliceService,) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getStory(id);
  }

  getStory(id: number): void {
    this.storyService.getStory(id)
      .subscribe(story => this.story = story);
  }

}
