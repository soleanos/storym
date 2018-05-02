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
import { HomeAuthorHeaderComponent } from './components/sub/home-author-header/home-author-header.component';
import { StoryEditionHeaderComponent } from './components/sub/story-edition-header/story-edition-header.component';
import { StoryEditionComponent } from './components/story-edition/story-edition.component';
import { SliceComponent } from './components/sub/slice/slice.component';
import { SliceEditorDialogComponent } from './components/sub/slice-editor-dialog/slice-editor-dialog.component';
import { HomeAuthorComponent } from './components/home-author/home-author.component';
import { HomeReaderComponent } from './components/home-reader/home-reader.component';
import { SlicesComponent } from './components/sub/slices/slices.component';
import { StoryCreationDialogComponent } from './components/sub/story-creation-dialog/story-creation-dialog.component';
import { StoriesAuthorComponent } from './components/sub/stories-author/stories-author.component';
import { StoryAuthorComponent } from './components/sub/story-author/story-author.component';
import { StoriesReaderComponent } from './components/sub/stories-reader/stories-reader.component';
import { StoryReaderComponent } from './components/sub/story-reader/story-reader.component';
import { StoryTestComponent } from './components/story-test/story-test.component';
import { ReadComponent } from './components/read/read.component';
import { ChoiceCreationDialogComponent } from './components/sub/choice-creation-dialog/choice-creation-dialog.component';
import { MessagesComponent } from './components/sub/messages/messages.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HomeReaderHeaderComponent } from './components/sub/home-reader-header/home-reader-header.component';

import { ComfirmDialogComponent } from './components/sub/confirm-dialog/confirm-dialog.component';

import { StoryService} from './services/story.service';
import { SliceService} from './services/slice.service';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';

import { SliceByLevelPipe } from './pipes/slice-by-level.pipe';
import { SliceLinkPipe } from './pipes/slice-link.pipe';

import { AuthGuard } from './services/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountComponent } from './components/account/account.component';
import { StoryManagementComponent } from './components/story-management/story-management.component';

import { NgxEditorModule } from 'ngx-editor';
import { HtmlToPlaintextPipe } from './pipes/html-to-plaintext.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeAuthorComponent,
    MessagesComponent,
    HomeAuthorHeaderComponent,
    StoryEditionHeaderComponent,
    StoryEditionComponent,
    SliceComponent,
    SliceEditorDialogComponent,
    SlicesComponent,
    StoryCreationDialogComponent,
    StoriesAuthorComponent,
    StoryAuthorComponent,
    SliceByLevelPipe,
    StoryTestComponent,
    ChoiceCreationDialogComponent,
    SliceLinkPipe,
    LoginComponent,
    RegistrationComponent,
    AccountComponent,
    StoryManagementComponent,
    ComfirmDialogComponent,
    HomeComponent,
    HomeReaderComponent,
    HomeReaderHeaderComponent,
    StoryReaderComponent,
    StoriesReaderComponent,
    ReadComponent,
    HtmlToPlaintextPipe,
    SafeHtmlPipe
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
    NgxEditorModule
  ],
  providers: [StoryService, MessageService, NgxEditorModule , CategoryService,
    SliceService, AuthService, UserService, AngularFirestoreModule, AngularFireAuthModule, AngularFireStorage, AuthGuard],
  entryComponents: [ComfirmDialogComponent, StoryCreationDialogComponent,
                     SliceEditorDialogComponent, ChoiceCreationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
