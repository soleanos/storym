import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-story-edition-header',
  templateUrl: './story-edition-header.component.html',
  styleUrls: ['./story-edition-header.component.css']
})
export class StoryEditionHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToHome= function () {
    this.router.navigateByUrl('/home');
  };

}
