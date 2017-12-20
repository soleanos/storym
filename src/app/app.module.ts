import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {StoryService} from './story.service';

import { AppComponent } from './app.component';
import { StoriesComponent } from './stories/stories.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent,
    StoryDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [StoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
