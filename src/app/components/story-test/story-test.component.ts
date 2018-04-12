import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../../model/Story';
import { StoryService } from '../../services/story.service';
import { SliceService } from '../../services/slice.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Slice } from '../../model/Slice';
import { Choice } from '../../model/Choice';


@Component({
  selector: 'app-story-test',
  templateUrl: './story-test.component.html',
  styleUrls: ['./story-test.component.css']
})

export class StoryTestComponent implements OnInit {
  story: Story;
  slices: Slice[];
  slicesOfStory: Slice[];
  slice: Slice;
  choices: Choice[];

  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService,
    private location: Location,
    private sliceService: SliceService) {
      this.slicesOfStory = new Array<Slice>();
      this.choices = new Array<Choice>();
    }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getFirstSlice(id);
    this.getStory(id);
    this.getSlices(id);
  }

  /**
   * Récupère l'histoire correspondant à l'id passé en paramètre
   * @param id
   */
  getStory(id: string): void {
    this.storyService.getStory(id)
      .subscribe(story => this.story = story);
  }

  /**
   * Récupère le premier passage de l'histoire
   * @param id
   */
  getFirstSlice(id: string): void {
    const slice = new Slice();
    this.sliceService.getSlicesOfStory(id)
      .subscribe(
        slices => this.addFirstSlice(slices.find(item => item.level === 0)),
    );
  }
  /**
   * Ajoute le première passage à l'histoire
   * @param slice
   */
  addFirstSlice(slice:  Slice) {
    this.slicesOfStory.push(slice);
    this.slice = slice;
  }
  /**
   * Récupère le passage correspondant au choix sur lequel on a cliqué
   * @param sliceId
   */
  getnextLinkedSlice(sliceId: String): any {
     return this.slices.filter(x => x.id === sliceId)[0];
  }

  /**
   * Ajoute le nouveau passage à la liste des passages
   * @param choice
   */
  addNextSliceToStory(choice: Choice) {
    const nextSlice: Slice = this.getnextLinkedSlice(choice.nextSliceId);
    this.slicesOfStory.push(nextSlice);
    this.slice = nextSlice;
  }

  /**
   * Récupère tous les passages de l'histoire
   * @param id
   */
  getSlices(id: string): void {
    this.sliceService.getSlicesOfStory(id)
      .subscribe(slices => this.slices = slices);
  }

  scrollToBottom = () => {
    // try {
    //   this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    // } catch (err) {}
  }

}
