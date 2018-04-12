
import { Choice } from '../model/Choice';

export class Slice {
    id: string;
    title: string;
    text: string;
    story: string;
    level: number;
    choices?: Choice[];
    color?: string;
    constructor() {
    }

  }
