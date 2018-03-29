import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularDraggableModule } from 'angular2-draggable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomAngularMaterialModule} from './modules/custom-angular-material.module';

import { AppComponent } from './app.component';
import { HomeHeaderComponent } from './components/sub/home-header/home-header.component';
import { HomePanelComponent } from './components/sub/home-panel/home-panel.component';
import { StoryEditionHeaderComponent } from './components/sub/story-edition-header/story-edition-header.component';
import { StoryEditionComponent } from './components/story-edition/story-edition.component';
import { SliceComponent } from './components/sub/slice/slice.component';
import { SliceEditorComponent } from './components/sub/slice-editor/slice-editor.component';
import { HomeComponent } from './components/home/home.component';
import { SlicesComponent } from './components/sub/slices/slices.component';
import { StoryCreationDialogComponent } from './components/sub/story-creation-dialog/story-creation-dialog.component';
import { StoriesComponent } from './components/sub/stories/stories.component';
import { StoryComponent } from './components/sub/story/story.component';
import { StoryTestComponent } from './components/story-test/story-test.component';
import { ChoiceCreationDialogComponent } from './components/sub/choice-creation-dialog/choice-creation-dialog.component';
import { MessagesComponent } from './components/sub/messages/messages.component';

import { StoryService} from './services/story.service';
import { SliceService} from './services/slice.service';
import { MessageService } from './services/message.service';

import { SliceByLevelPipe } from './pipes/slice-by-level.pipe';
import { SliceLinkPipe } from './pipes/slice-link.pipe';

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
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angularfs'),
    AngularFireDatabaseModule,
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
