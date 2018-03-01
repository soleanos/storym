import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {StoryService} from './story.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoriesComponent } from './stories/stories.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
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
import { StoriesHeaderComponent } from './stories-header/stories-header.component';
import { StoriesPanelComponent } from './stories-panel/stories-panel.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { StoryHeaderComponent } from './story-header/story-header.component';
import { StoryComponent } from './story/story.component';
import { SliceComponent } from './slice/slice.component';
import { SliceEditorComponent } from './slice-editor/slice-editor.component';

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
    SliceEditorComponent
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
  providers: [StoryService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
