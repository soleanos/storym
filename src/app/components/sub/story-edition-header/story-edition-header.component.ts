import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Story } from '../../../model/Story';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-story-edition-header',
  templateUrl: './story-edition-header.component.html',
  styleUrls: ['./story-edition-header.component.css']
})
export class StoryEditionHeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  @Input() story: Story;

  ngOnInit() {
  }

  disconnect = function () {
    this.authService.signOut();
  };

  goToHome = function () {
    this.router.navigateByUrl('/home');
  };

  goToStoryTest = function () {
    this.router.navigateByUrl('/test/' + this.story.id);
  };
}
