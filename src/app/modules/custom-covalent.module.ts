import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CovalentLayoutModule, CovalentStepsModule } from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentHttpModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule
  ],
  declarations: []
})
export class CustomCovalentModule { }
