import { Injectable } from '@angular/core';
import { Story } from './story';
import { STORIES } from './mock-stories';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class StoryService {

  constructor() { }

  getStories(): Observable<Story[]> {
    return of(STORIES);
  }

  getStory(id: number): Observable<Story> {
    return of(STORIES.find(story => story.id === id));
  }

}
