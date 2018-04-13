import { Component, OnInit } from '@angular/core';
import { Story } from '../../model/Story';
import { StoryService } from '../../services/story.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Component({
  selector: 'app-story-management',
  templateUrl: './story-management.component.html',
  styleUrls: ['./story-management.component.css']
})
export class StoryManagementComponent implements OnInit {
  story: Story;
  selectedFiles: FileList;
  file: File;
  imgsrc: Observable<string>;
  color = 'primary';
  mode = 'determinate';
  progressBarValue;
  photoURL: string;

  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService,
    private storage: AngularFireStorage,
    private router: Router
  ) {  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getStory(id);
  }

   /**
   * Récupère l'histoire correspondant à l'id passé en paramètre
   * @param id
   */
  getStory(id: string): void {
    this.storyService.getStory(id)
      .subscribe(story => this.fillFieldByStory(story));
  }

  fillFieldByStory(story: Story) {
    this.story = story;
    this.photoURL = story.cover;
  }

  uploadpic() {
    const file = this.selectedFiles.item(0);
    const uniqkey = 'cover' + Math.floor(Math.random() * 1000000);
    const uploadTask = this.storage.upload('/storyCover/' + uniqkey, file);
    this.imgsrc = uploadTask.downloadURL();
    uploadTask.percentageChanges().subscribe((value) => {
      this.progressBarValue = value.toFixed(2);
    });
    this.imgsrc.subscribe(image => {this.story.cover = image; });
  }

  chooseFiles(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.item(0)) {
      this.uploadpic();
    }
  }

  saveStoryInfos() {
    this.storyService.updateStory(this.story);
    this.router.navigateByUrl('/home/author/');
  }


}
