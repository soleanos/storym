import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../story';
import { StoryService } from '../story.service';
import { SliceService } from '../slice.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Slice } from '../Slice';
import { Choice } from '../Choice';


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
 
  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService,
    private location: Location,
    private sliceService: SliceService) { 
      this.slicesOfStory = new Array<Slice>();
    }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getFirstSlice(id);
    this.getStory(id);
    this.getSlices(id);
  }

  /**
   * Récupère l'histoire correspondant à l'id passé en paramètre
   * @param id 
   */
  getStory(id: number): void {
    this.storyService.getStory(id)
      .subscribe(story => this.story = story);
  }

  /**
   * Récupère le premier passage de l'histoire
   * @param id 
   */
  getFirstSlice(id: number): void {
    this.sliceService.searchSlices(id)
      .subscribe(
        slices => this.slice = slices.find(item => item.level === 0)
        , error => console.error('Error: ' + error), () => this.slicesOfStory.push(this.slice)
      );
  }

  /**
   * Récupère le passage correspondant au choix sur lequel on a cliqué
   * @param sliceName 
   */
  getnextLinkedSlice(sliceName: String): any {
     return this.slices.filter(x => x.title === sliceName)[0];
  }

  /**
   * Ajoute le nouveau passage à la liste des passages
   * @param choice 
   */
  addNextSliceToStory(choice: Choice) {
    const nextSlice: Slice = this.getnextLinkedSlice(choice.title);
    this.slicesOfStory.push(nextSlice);
    this.slice = nextSlice;
  }

  /**
   * Récupère tous les passages de l'histoire
   * @param id 
   */
  getSlices(id: number): void {
    this.sliceService.searchSlices(id)
      .subscribe(slices => this.slices = slices);
  }

  /**
   * Echappe tous les caractères spéciaux d'une chaine de caractère.
   * @param text 
   */
  escapeRegExp(text): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  scrollToBottom = () => {
    // try {
    //   this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    // } catch (err) {}
  }

}
