import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { ChoiceCreationDialogComponent } from './choice-creation-dialog/choice-creation-dialog.component';
import { SliceLinkPipe } from './slice-link.pipe';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    StoryTestComponent,
    ChoiceCreationDialogComponent,
    SliceLinkPipe
  ],
  imports: [
    CustomAngularMaterialModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angularfs'),
    AngularFireDatabaseModule,
    // CustomCovalentModule,
    AngularDraggableModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFirestoreModule
  ],
  providers: [StoryService, MessageService, SliceService, AngularFirestoreModule],
  entryComponents: [StoryCreationDialogComponent, SliceEditorComponent, ChoiceCreationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
