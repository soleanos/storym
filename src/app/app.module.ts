import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomAngularMaterialModule} from './custom-angular-material.module';
import {CustomCovalentModule} from './custom-covalent.module';

import { AppComponent } from './app.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomePanelComponent } from './home-panel/home-panel.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryEditionHeaderComponent } from './story-edition-header/story-edition-header.component';
import { StoryEditionComponent } from './story-edition/story-edition.component';
import { SliceComponent } from './slice/slice.component';
import { SliceEditorComponent } from './slice-editor/slice-editor.component';
import { HomeComponent } from './home/home.component';
import {StoryService} from './story.service';
import {SliceService} from './slice.service';
import { SlicesComponent } from './slices/slices.component';
import { StoryCreationDialogComponent } from './story-creation-dialog/story-creation-dialog.component';
import { StoriesComponent } from './stories/stories.component';
import { StoryComponent } from './story/story.component';
import { StoryTestComponent } from './story-test/story-test.component';
import { SliceByLevelPipe } from './slice-by-level.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoryDetailComponent,
    MessagesComponent,
    HomeHeaderComponent,
    HomePanelComponent,
    StoryEditionHeaderComponent,
    StoryEditionComponent,
    SliceComponent,
    SliceEditorComponent,
    SlicesComponent,
    StoryCreationDialogComponent,
    StoriesComponent,
    StoryComponent,
    SliceByLevelPipe,
    StoryTestComponent
  ],
  imports: [
    CustomAngularMaterialModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    CustomCovalentModule,
    AngularDraggableModule,
    BrowserAnimationsModule,
  ],
  providers: [StoryService, MessageService, SliceService],
  entryComponents: [StoryCreationDialogComponent, SliceEditorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
