import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlToPlaintext'
})
export class HtmlToPlaintextPipe implements PipeTransform {

  transform(text: string): any {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }

}
