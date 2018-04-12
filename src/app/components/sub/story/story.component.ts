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
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
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
    this.imageAuthor = this.sanitization.bypassSecurityTrustStyle(`url(${this.user.photoURL})`);
  }

  /**
   * Redirige vers la page d'édition de l'histoire
   * @param storyId
   */
  edit(storyId: string): void {
    this.router.navigateByUrl('/story/' + storyId);
  }

  /**
   * Supprime l'histoire
   * @param story
   */
  delete(story: Story): void {
    this.stories = this.stories.filter(h => h !== story);
    this.storyService.deleteStory(story).subscribe();
    this.storiesChange.emit(this.stories);
  }

  /**
   * Change le statut de la publification de l'histoire
   * @param story
   */
  updatePublication(story: Story): void {
    this.story.published = !this.story.published;
    this.storyService.updateStory(story).subscribe();
    this.storiesChange.emit(this.stories);
  }

  /**
   * Ouvre la popup de confirmation publication/dépublication
   */
  openPublicationDialog(story: Story): void {
    let text = 'Etes vous sûr de vouloir publier votre histoire ? Elle sera désormais accessible aux lecteurs.';
    if (this.story.published) {
      text = 'Etes vous sûr de vouloir dépublier votre histoire ? Elle ne sera plus accessible aux lecteurs.';
    }

    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      width: '300px',
      data: {message : text }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.updatePublication(story);
      }
    });
  }

  /**
   * Ouvre la popup de confirmation de suppression
   */
  openDeleteDialog(story: Story): void {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      width: '300px',
      data: {message : 'Etes vous sur de vouloir supprimer définitivement cette histoire ?'}
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.delete(story);
      }
    });
  }

}
