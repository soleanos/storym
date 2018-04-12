import { Pipe, PipeTransform } from '@angular/core';
import {Slice} from '../model/Slice';
@Pipe({
  name: 'sliceByLevel',
  pure: true
})
export class SliceByLevelPipe implements PipeTransform {
  allSlice: Slice[];

  transform(allSlice: Slice[], number: number): any {
    // return allSlice.filter(slice => slice.level === number);
    return this.filter(allSlice, number);
  }

  /**
   * Filtrer les passages en fonction de leur niveau,
   * pour chaque niveau on attribue une couleur aléatoire au apssage
   * @param allSlice
   * @param number
   */
  filter(allSlice, number) {
    this.allSlice = allSlice.filter(slice => slice.level === number);
    if (this.allSlice.length === 0) {return this.allSlice; }

    const randomColor = this.color();
    for (const slice of this.allSlice) {
      slice.color = randomColor;
    }

    return this.allSlice;
  }

  /**
   * Genère un code couleur aléatoire
   */
    color(): string {
        return'rgb(' + Math.floor(Math.random() * 255)
        + ',' + Math.floor(Math.random() * 255) + ','
        + Math.floor(Math.random() * 255) + ')';
    }

}
