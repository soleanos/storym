import { Pipe, PipeTransform } from '@angular/core';
import {Slice} from '../model/Slice';
@Pipe({
  name: 'sliceByLevel',
  pure: false
})
export class SliceByLevelPipe implements PipeTransform {

  transform(allSlice: Slice[], number: number): any {
    return allSlice.filter(slice => slice.level === number);
  }

}
