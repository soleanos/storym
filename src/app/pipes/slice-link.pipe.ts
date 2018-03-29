import { Pipe, PipeTransform,OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Slice } from '../model/Slice';

@Pipe({
  name: 'sliceLink'
})
export class SliceLinkPipe implements PipeTransform {
  linkedSlicesUnformated: string[];
  sliceStringArray: string[];
  finalText: string;
  constructor(private _sanitizer: DomSanitizer) {
  }

  transform(v: string): SafeHtml {
    this.formatSliceText(v);
    return this._sanitizer.bypassSecurityTrustHtml(this.finalText);
  }

  /**
   * Transforme chaque lien en bouton.
   * @param sliceText
   */
  formatSliceText(sliceText: string) {
    this.finalText = sliceText;
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
          const final = "<button color='primary' style ='mat-button' onClick = 'alert()' >"+this.sliceStringArray[0] +"</button>";
          this.finalText = this.finalText.replace(re, final);
        }
      });
    }
  }

  escapeRegExp(text): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

}
