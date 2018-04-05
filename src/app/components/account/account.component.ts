import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user : User;
  title = 'app';
  selectedFiles: FileList;
  file: File;
  imgsrc;
  color: string = 'primary';
  mode: 'determinate';
  progressBarValue;
  photoUrl : string;

  constructor(private storage: AngularFireStorage,private authService: AuthService, private userService : UserService, private af: AngularFireAuth,) {
    authService.getAuth().subscribe(user => this.photoUrl = user.photoURL);
  }
 
  chooseFiles(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.item(0))
      this.uploadpic();  
  }
 
  uploadpic() {
    let file = this.selectedFiles.item(0);
    let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
    const uploadTask = this.storage.upload('/profilPicture/' + uniqkey, file);
 
    this.imgsrc = uploadTask.downloadURL();
 
    uploadTask.percentageChanges().subscribe((value) => {
      this.progressBarValue = value.toFixed(2);
    })
  }

  ngOnInit() {
  }

}
