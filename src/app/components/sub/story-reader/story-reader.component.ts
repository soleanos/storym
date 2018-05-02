import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {StoryService} from '../../../services/story.service';
import * as firebase from 'firebase/app';
import { Story } from '../../../model/Story';
import { SafeStyle } from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ComfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-story-reader',
  templateUrl: './story-reader.component.html',
  styleUrls: ['./story-reader.component.css']
})
export class StoryReaderComponent implements OnInit {
  @Input() user: firebase.User;
  @Input() story: Story;
  @Input() stories: Story[];
  @Output() storiesChange = new EventEmitter<Story[]>();
  imageAuthor: SafeStyle;

  constructor(public dialog: MatDialog,
    private storyService: StoryService, private router: Router,
    private sanitization: DomSanitizer) {
  }

  ngOnInit() {
    this.imageAuthor = this.sanitization.bypassSecurityTrustStyle(`url(${this.story.authorPicture})`);
  }

  /**
   * Redirige vers la page de lecture de l'histoire
   * @param storyId
   */
  read(storyId: string): void {
    this.router.navigateByUrl('/read/' + this.story.id);
  }

  getAuthorInfos(storyId: string) {
      this.router.navigateByUrl('/read/' + this.story.id);
  }

}
