import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularDraggableModule } from 'angular2-draggable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireStorage } from 'angularfire2/storage';

import { CustomAngularMaterialModule} from './modules/custom-angular-material.module';

import { AppComponent } from './app.component';
import { HomeHeaderComponent } from './components/sub/home-header/home-header.component';
import { HomePanelComponent } from './components/sub/home-panel/home-panel.component';
import { StoryEditionHeaderComponent } from './components/sub/story-edition-header/story-edition-header.component';
import { StoryEditionComponent } from './components/story-edition/story-edition.component';
import { SliceComponent } from './components/sub/slice/slice.component';
import { SliceEditorDialogComponent } from './components/sub/slice-editor-dialog/slice-editor-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { SlicesComponent } from './components/sub/slices/slices.component';
import { StoryCreationDialogComponent } from './components/sub/story-creation-dialog/story-creation-dialog.component';
import { StoriesComponent } from './components/sub/stories/stories.component';
import { StoryComponent } from './components/sub/story/story.component';
import { StoryTestComponent } from './components/story-test/story-test.component';
import { ChoiceCreationDialogComponent } from './components/sub/choice-creation-dialog/choice-creation-dialog.component';
import { MessagesComponent } from './components/sub/messages/messages.component';
import { LoginComponent } from './components/login/login.component';

import { StoryService} from './services/story.service';
import { SliceService} from './services/slice.service';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import { SliceByLevelPipe } from './pipes/slice-by-level.pipe';
import { SliceLinkPipe } from './pipes/slice-link.pipe';

import { AuthGuard } from './services/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountComponent } from './components/account/account.component';
import { StoryManagementComponent } from './components/story-management/story-management.component';

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
    SliceEditorDialogComponent,
    SlicesComponent,
    StoryCreationDialogComponent,
    StoriesComponent,
    StoryComponent,
    SliceByLevelPipe,
    StoryTestComponent,
    ChoiceCreationDialogComponent,
    SliceLinkPipe,
    LoginComponent,
    RegistrationComponent,
    AccountComponent,
    StoryManagementComponent
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
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [StoryService, MessageService, 
    SliceService, AuthService, UserService, AngularFirestoreModule, AngularFireAuthModule,AngularFireStorage, AuthGuard],
  entryComponents: [StoryCreationDialogComponent, SliceEditorDialogComponent, ChoiceCreationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
