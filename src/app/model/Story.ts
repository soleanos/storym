import { Slice } from '../model/Slice';

export class Story {
    id: string;
    title: string;
    slices?: Slice[];
    cover?: string;
    abstract?: string;
    author?: string;
    reports?: Array<string>;
    status?: number;
    langage?: string;
    authorPicture?: string;
    authorName?: string;
  }
