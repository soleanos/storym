import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../story';
import { StoryService } from '../story.service';
import { SliceService } from '../slice.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Slice } from '../Slice';

@Component({
  selector: 'app-story-test',
  templateUrl: './story-test.component.html',
  styleUrls: ['./story-test.component.css']
})
export class StoryTestComponent implements OnInit {
  story: Story;
  slices: Slice[];
  slice: Slice;
  linkedSlicesUnformated: string[];
  sliceStringArray: string[];
  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService,
    private location: Location,
    private sliceService: SliceService) { }
 

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getFirstSlice(id);
    this.getStory(id);
    // this.slice = this.getFirstSlice();
  }

  getStory(id: number): void {
    this.storyService.getStory(id)
      .subscribe(story => this.story = story);
  }

  getFirstSlice(id: number): void {
    this.sliceService.searchSlices(id)
      .subscribe(
        slices => this.slice = slices.find(item => item.level === 0)
        // ,error => console.error('Error: ' + error), () => this.formatSliceText(this.slice.text)
      );
  }

  getnextLinkedSlice(sliceName: String): any {
     return this.slices.filter(x => x.title === sliceName)[0];
  }

  /**
   * Crée un passage pour chaque pattern [x | y] trouvé dans le texte
   * avec pour titre y
   * @param sliceText
   */
  formatSliceText(sliceText: String): any {
    this.linkedSlicesUnformated =  sliceText.match(/(\[([^\]]|\]\[)*\])/g);
    if (this.linkedSlicesUnformated) {
      this.linkedSlicesUnformated.forEach(element => {
        const elementNoFormat = element;
        element = element.substr(1, element.length - 2);
        // Si on a un pipe alors on coupe en deux
        if (element.search(/[|]/g) !== -1) {
          element.replace(/[\[]|[\]]/, '');
          this.sliceStringArray = element.split('|');
          this.sliceStringArray.forEach(sliceElement => {
            sliceElement.trim();
          });
          const re = new RegExp(this.escapeRegExp(elementNoFormat));
          this.slice.text = this.slice.text.replace(re, this.sliceStringArray[0]);
         // this.slice.text += "<button color='primary' mat-button (click) = 'addSliceTag()' >Ajouter un lien vers passage</button>";
        }
      });
    }
  }

  escapeRegExp(text): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
}
