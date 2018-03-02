import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { MessageService } from './message.service';
import { MatCardModule} from '@angular/material';
import { MessagesComponent } from './messages/messages.component';
import { CovalentLayoutModule, CovalentStepsModule } from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { AngularDraggableModule } from 'angular2-draggable';

import { AppComponent } from './app.component';
import { StoriesHeaderComponent } from './stories-header/stories-header.component';
import { StoriesPanelComponent } from './stories-panel/stories-panel.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryHeaderComponent } from './story-header/story-header.component';
import { StoryComponent } from './story/story.component';
import { SliceComponent } from './slice/slice.component';
import { SliceEditorComponent } from './slice-editor/slice-editor.component';
import { StoriesComponent } from './stories/stories.component';
import {StoryService} from './story.service';
import {SliceService} from './slice.service';
import { SlicesComponent } from './slices/slices.component';

@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent,
    StoryDetailComponent,
    MessagesComponent,
    StoriesHeaderComponent,
    StoriesPanelComponent,
    StoryHeaderComponent,
    StoryComponent,
    SliceComponent,
    SliceEditorComponent,
    SlicesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    MatCardModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    AngularDraggableModule
  ],
  providers: [StoryService, MessageService, SliceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
