import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {StoryService} from '../../../services/story.service';
import * as firebase from 'firebase/app';
import { Story } from '../../../model/Story';
import { SafeStyle } from '@angular/platform-browser';

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
  constructor(private storyService: StoryService, private router: Router, private sanitization: DomSanitizer) {

  }

  ngOnInit() {
    this.imageAuthor = this.sanitization.bypassSecurityTrustStyle(`url(${this.user.photoURL})`);
  }

  edit(storyId: string): void {
    this.router.navigateByUrl('/story/' + storyId);
  }

  delete(story: Story): void {
    this.stories = this.stories.filter(h => h !== story);
    this.storyService.deleteStory(story).subscribe();
    this.storiesChange.emit(this.stories);
  }
}
