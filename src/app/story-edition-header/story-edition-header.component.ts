import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Story } from '../story';


@Component({
  selector: 'app-story-edition-header',
  templateUrl: './story-edition-header.component.html',
  styleUrls: ['./story-edition-header.component.css']
})
export class StoryEditionHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() story: Story;

  ngOnInit() {
  }

  goToHome= function () {
    this.router.navigateByUrl('/home');
  };

  goToStoryTest = function () {
    this.router.navigateByUrl('/test/'+this.story.id);
  };
}
