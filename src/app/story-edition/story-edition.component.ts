import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../story';
import { Slice } from '../Slice';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StoryService } from '../story.service';
import { SliceService } from '../slice.service';


@Component({
  selector: 'app-story-edition',
  templateUrl: './story-edition.component.html',
  styleUrls: ['./story-edition.component.css']
})
export class StoryEditionComponent implements OnInit {

  @Input() story: Story;
  @Input() slices: Slice[];

  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService,
    private location: Location,
    private sliceService: SliceService,
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getSlices(id);
    this.getStory(id);
  }

  getStory(id: number): void {
    this.storyService.getStory(id)
      .subscribe(story => this.story = story);
  }

  getSlices(id: number): void {
    this.sliceService.searchSlices(id)
      .subscribe(slices => this.slices = slices);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.storyService.updateStory(this.story)
      .subscribe(() => this.goBack());
  }

}
