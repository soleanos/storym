
import { Choice } from './Choice';

export class Slice {
    id?: number;
    title: string;
    text: string;
    story: number;
    level?: number;
    rank?: number;
    choices? :Choice[];
    constructor() {
    }

    // constructor(title: string, text: string, story: number) {
    //   this.title = title;
    //   this.text = text;
    //   this.story = story;
    //  }

    // setTitle(title: string) {
    //   this.title = title;
    // }

    // setText(text: string) {
    //   this.text = text;
    // }

    // setStory(storyId: number) {
    //   this.story = storyId;
    // }

    // getTitle() {
    //   return this.title;
    // }

    // getStory() {
    //   return this.story;
    // }

    // getText() {
    //   return this.text;
    // }

  }
